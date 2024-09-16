import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";
async function PATCH({ params }: { params: { serverID: string } }) {
  try {
    const profile = await userData();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverID)
      return new NextResponse("Server ID missing", { status: 400 });

    const server = await db.server.findUnique({
      where: {
        id: params.serverID,
      },
    });
    if (!server) return new NextResponse("Server not found", { status: 404 });

    const updatedServer = await db.server.update({
      where: {
        id: params.serverID,
      },
      data: {
        inviteCode: uuidV4(),
      },
    });

    return NextResponse.json(updatedServer, { status: 200 });
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
