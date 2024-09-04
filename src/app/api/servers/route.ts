import { v4 as uuidV4 } from "uuid";

import userData from "@/lib/user/userData";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { InitialServerSchema } from "@/Schema/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { success, data: validData } = InitialServerSchema.safeParse(data);
    const profile = await userData();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (success) {
      const server = await db.server.create({
        data: {
          name: validData.name,
          imageUrl: validData.imageUrl,
          inviteCode: uuidV4(),
          profileID: profile.id,
          channels: {
            create: [{ name: "general", profileID: profile.id }],
          },
          members: {
            create: [
              { profileID: profile.id, role: MemberRole.ADMIN },
            ],
          },
        },
      });
      return NextResponse.json(server);
    }
  } catch (error) {
    console.log("[SERVER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}