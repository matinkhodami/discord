import { ChannelType, MemberRole } from "@prisma/client";
import type { ServerInfo } from "@/components/server/lib/getServer";
// lib
import userData from "@/lib/user/userData";
// Components
import ServerHeader from "./ServerHeader";
import { Button } from "../ui/button";

// Icons
import Icon from "@mdi/react";
import {
  mdiPound,
  mdiVideo,
  mdiVolumeHigh,
  mdiChessKing,
  mdiChessQueen,
  mdiChessPawn,
} from "@mdi/js";
import Search from "./Search";

const ServerSideBar = async ({ server }: { server: ServerInfo }) => {
  const user = await userData();

  const channelIcon = (channelType: ChannelType) => {
    switch (channelType) {
      case ChannelType.TEXT:
        return <Icon path={mdiPound} size={0.8} />;
      case ChannelType.AUDIO:
        return <Icon path={mdiVolumeHigh} size={0.8} />;
      case ChannelType.VIDEO:
        return <Icon path={mdiVideo} size={0.8} />;
      default:
        return null;
    }
  };
  const roleIcon = (role: MemberRole) => {
    switch (role) {
      case MemberRole.ADMIN:
        return <Icon path={mdiChessKing} size={0.8} className="text-rose-500"/>;
      case MemberRole.MODERATOR:
        return <Icon path={mdiChessQueen} size={0.8} className="text-violet-500"/>;
      case MemberRole.GUEST:
        return <Icon path={mdiChessPawn} size={0.8} />;
      default:
        return null;
    }
  };

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
  const role = server?.members.find(
    (member) => member.profileID === user?.id
  )?.role;

  const data = [textChannel, audioChannel, videoChannel, members].map(
    (item) => ({})
  );
  return (
    <>
      <ServerHeader server={server} role={role as MemberRole} />
      <div className="p-1">
        <Search
          data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannel.map((channel) => ({
                id: channel.id,
                icon: channelIcon(channel.type),
                name: channel.name,
              })),
            },
            {
              label: "Audio Channels",
              type: "channel",
              data: audioChannel.map((channel) => ({
                id: channel.id,
                icon: channelIcon(channel.type),
                name: channel.name,
              })),
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannel.map((channel) => ({
                id: channel.id,
                icon: channelIcon(channel.type),
                name: channel.name,
              })),
            },
            {
              label: "Members",
              type: "member",
              data: members.map((member) => ({
                id: member.id,
                icon: roleIcon(member.role),
                name: member.profile.name,
              })),
            },
          ]}
        />
      </div>
    </>
  );
};

export default ServerSideBar;
