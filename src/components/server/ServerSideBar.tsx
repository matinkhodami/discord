import { ChannelType, MemberRole } from "@prisma/client";
import type { ServerInfo } from "@/components/server/lib/getServer";
// lib
import userData from "@/lib/user/userData";
// Components
import ServerHeader from "./ServerHeader";
import Loader from "../Animation/Loader";

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
  const role = server?.members.find((member) => member.id === user?.id)?.role;
  return (
    <>
      <ServerHeader server={server} role={role as MemberRole} />
    </>
  );
};

export default ServerSideBar;
