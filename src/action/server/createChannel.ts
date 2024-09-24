import { db } from "@/lib/db";
import userData from "@/lib/user/userData";
import { ChannelType } from "@prisma/client";
export default async function createChannel(
  data: { name: string; channelType: ChannelType },
  serverID: string
) {
  const profile = await userData();

  if (!profile)
    return {
      message: "Unauthorized!",
      success: false,
      data: null,
    };
  const server = await db.server.findUnique({
    where: {
      id: serverID,
    },
    include: {
      channels: true,
    },
  });
  if (!server) {
    return {
      message: "server not exist!",
      success: false,
      data: null,
    };
  }

  const channel = server.channels.find((channel) => channel.name === data.name);
  if (channel) {
    return {
      message: "channel already exist!",
      success: false,
      data: null,
    };
  } else {
    const updatedServer = await db.server.update({
      where: {
        id: serverID,
      },
      data: {
        channels: {
          create: {
            name: data.name,
            type: data.channelType,
            profileID: profile.id,
          },
        },
      },
    });

    return {
        message: "Channel successfully created!",
        success: true,
        data: null
    }
  }
}
