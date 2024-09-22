import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { InitialServerSchema } from "@/Schema/server";
import { z } from "zod";

async function saveChanges(
  data: z.infer<typeof InitialServerSchema>,
  serverID: string
) {
  const user = await userData();
  const result = InitialServerSchema.safeParse(data);
  if (!result.success) {
    return {
      message: "Invalid data!",
      success: false,
    };
  } else {
    const res = await db.server.update({
      where: {
        id: serverID,
        AND: {
          profileID: user?.id,
        },
      },
      data: result.data,
    });
    console.log("[SAVE_CHANGES]: ", res)
    return { 
        message: "Server updated successfully!",
        success: true
    }
  }
}

export default saveChanges;
