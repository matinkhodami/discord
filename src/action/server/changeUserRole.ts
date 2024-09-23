import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { MemberRole } from "@prisma/client";

export default async function changeUserRole(
  serverID: string,
  userID: string,
  newRole: MemberRole
) {
  const user = await userData();
  if (user?.id === userID)
    return {
      message: "You can't change your own role!",
      success: false,
      data: null,
    };
  const server = await db.server.update({
    where: {
      id: serverID,
      profileID: user?.id,
    },
    data: {
      members: {
        update: {
          where: {
            id: userID,
            NOT: {
              profileID: user?.id,
            },
          },
          data: {
            role: newRole,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: {
            select: {
              email: true,
              id: true,
              image: true,
              name: true,
            },
          },
        },
        orderBy: {
          role: "asc",
        },
      },
      channels: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          server: false,
          profile: {
            select: {
              email: true,
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    message: "User role changed!",
    success: true,
    data: server,
  };
}
