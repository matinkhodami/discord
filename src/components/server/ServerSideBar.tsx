import { ChannelType } from "@prisma/client";
import type { ServerInfo } from "@/components/server/lib/getServer";
// lib
import userData from "@/lib/user/userData";
// Components
import ServerHeader from "./ServerHeader";

const ServerSideBar = async ({ server }: { server: ServerInfo | null }) => {
  const user = await userData();
  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  // ALL member without us
  const members = server?.members.filter((member) => member.id !== user?.id);
  // our role
  const role = server?.members.find((member) => member.id === user?.id);
  return (
    <>
      {/* FIXME ROLE PROBLEM  */}
      <ServerHeader server={server} role={"ADMIN"} />
    </>
  );
};

export default ServerSideBar;
