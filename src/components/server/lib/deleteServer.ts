"use server"

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

const deleteServer = async (serverID: string, adminID: string) => {
    
    const server = await db.server.findUnique({
      where: {
        id: serverID,
      },
      include: {
        members: true,
      }
    });

    if (!server) {
      throw new Error("Server not found");
    }
    const admin = server.members.find(user => user.profileID === adminID);
    if (!admin) {
      throw new Error("Admin not found in the server");
    }
    const isAdmin = admin.role === MemberRole.ADMIN;
    if (!isAdmin) {
      throw new Error("You are not authorized to delete this server");
    }
    await db.server.delete({
      where: {
        id: serverID,
      },
    });

    console.log("Server deleted successfully");

}

export default deleteServer