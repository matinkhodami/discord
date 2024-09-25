"use client";
// Types
import { MemberRole } from "@prisma/client";
import { ServerInfo } from "./lib/getServer";

// Components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Icons
import Icon from "@mdi/react";
import {
  mdiMenuDown,
  mdiAccountPlus,
  mdiPlus,
  mdiCog,
  mdiAccountMultiple,
  mdiTrashCan,
  mdiLogout,
} from "@mdi/js";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";

interface ServerHeaderProps {
  server: ServerInfo | null;
  role: MemberRole;
}
const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  // user
  const user = useUserData();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR;
  const { onOpen } = useModalStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full" asChild>
        <button
          className={cn(
            "w-full border-b-0 focus:outline-none outline-none rounded-md flex justify-between px-2 py-1",
            "bg-lightPrimary text-white border-light dark:bg-dark dark:border-darkSecondary"
          )}
        >
          {server?.name}
          <Icon path={mdiMenuDown} size={1} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          className="flex justify-between w-full py-1 px-2 text-xs text-primary hover:bg-primary/10 hover:text-primary"
          onClick={() => {
            onOpen("invite", { server: server || undefined });
          }}
        >
          Invite People
          <Icon path={mdiAccountPlus} size={0.8} />
        </DropdownMenuItem>
        {(isAdmin || isModerator) && (
          <>
            <DropdownMenuItem
              className="flex justify-between w-full py-1 px-2 text-xs"
              onClick={() =>
                onOpen("serverSettings", { server: server || undefined })
              }
            >
              Server Settings
              <Icon path={mdiCog} size={0.8} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between w-full py-1 px-2 text-xs"
              onClick={() => {
                onOpen("manageUser", { server: server || undefined });
              }}
            >
              Manage Member
              <Icon path={mdiAccountMultiple} size={0.8} />
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          className="flex justify-between w-full py-1 px-2 text-xs"
          onClick={() => {
            console.log("CreateChannel")
            onOpen("createChannel", { server: server || undefined });
          }}
        >
          Create channel
          <Icon path={mdiPlus} size={0.8} />
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(
                "flex justify-between w-full py-1 px-2 text-xs",
                "text-rose-500 hover:text-rose-500 focus:text-rose-500",
                "hover:bg-rose-300/10 focus:bg-rose-300/10"
              )}
              onClick={async () => {
                onOpen("deleteServer", { server: server || undefined });
              }}
            >
              Delete Server
              <Icon path={mdiTrashCan} size={0.8} />
            </DropdownMenuItem>
          </>
        )}
        {!isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(
                "flex justify-between w-full py-1 px-2 text-xs ",
                "text-rose-500 hover:text-rose-500 focus:text-rose-500",
                "hover:bg-rose-300/10 focus:bg-rose-300/10"
              )}
              onClick={async () => {
                onOpen("leaveServer", { server: server || undefined });
              }}
            >
              Leave Server
              <Icon path={mdiLogout} size={0.8} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
