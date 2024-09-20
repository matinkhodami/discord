import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { MemberRole } from "@prisma/client";

const deleteServer = async (serverID: string) => {
  if (!serverID) return {
    message: "Internal Error!",
    success: false,
  };
  
  const existServer = await db.server.findUnique({
    where: {
      id: serverID,
    },
    include: {
      members: true,
    },
  });
  if (!existServer) {
    return {
      message: "server does not exist!",
      success: false,
    };
  } else {
    const user = await userData();
    const findProfile = existServer.members.find(
      (profile) => profile.profileID === user?.id
    );
    if (findProfile?.role === MemberRole.ADMIN) {
      await db.server.delete({
        where: {
          id: serverID,
        },
      });
      return {
        message: "Server deleted successfully!",
        success: true,
      };
    } else
      return {
        message: "You are not authorized to delete this server!",
        success: false,
      };
  }
};

export default deleteServer;
