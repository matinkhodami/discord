"use server";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
const leaveServer = async (serverID: string, memberID: string) => {
  const server = await db.server.findUnique({
    where: {
      id: serverID,
    },
    include: {
      members: true,
    },
  });

  if (!server) {
    throw new Error("Server not found");
  }

  const member = server.members.find((user) => user.profileID === memberID);

  if (!member) {
    throw new Error("Member not found in the server");
  }
  if (member.role === MemberRole.ADMIN) {
    throw new Error("Admin can't leave!");
  }

  const updatedServer = await db.server.update({
    where: { id: serverID },
    data: {
      members: {
        delete: {
          id: member.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  return updatedServer;
};

export default leaveServer;
