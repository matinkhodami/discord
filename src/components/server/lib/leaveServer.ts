"use server"

import { db } from "@/lib/db";
const leaveServer = async (serverID: string, memberID: string) => {
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

    const member = server.members.find(user => user.profileID === memberID);
    if (!member) {
      throw new Error("Member not found in the server");
    }

    const updatedServer = await db.server.update({
      where: { id: serverID },
      data: {
        members: {
          delete: {
            id: member.id
          }
        }
      },
      include: {
        members: true
      }
    });

    return updatedServer;
};

export default leaveServer
