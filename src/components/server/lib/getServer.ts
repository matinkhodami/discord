import { db } from "@/lib/db";
import { Server, MemberRole, ChannelType } from "@prisma/client";

export type ServerInfo = Server & {
  members: {
    id: string;
    role: MemberRole;
    profileID: string;
    serverID: string;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      id: string;
      name: string;
      image: string | null;
      email: string;
    };
  }[];
  channels: ({
    profile: {
      name: string;
      id: string;
      image: string | null;
      email: string;
    };
  } & {
    id: string;
    name: string;
    type: ChannelType;
    serverID: string;
    profileID: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
};

const getServerInfo = async (serverID: string): Promise<ServerInfo | null> => {
  const server = await db.server.findUnique({
    where: {
      id: serverID,
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
  return server || null;
};

const getServers = async (userID: string): Promise<Server[]> => {
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileID: userID,
        },
      },
    },
  });
  return servers;
};

export { getServers, getServerInfo };
