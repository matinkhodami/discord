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
  mdiSettingsHelper,
  mdiCog,
  mdiAccountMultiple,
} from "@mdi/js";
import { cn } from "@/lib/utils";

interface ServerHeaderProps {
  server: ServerInfo | null;
  role: MemberRole;
}
const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === "ADMIN";
  const isModerator = role === "MODERATOR";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full" asChild>
        <button
          className={cn(
            "w-full dark:bg-dark border-4 border-b-0 border-secondary focus:outline-none outline-none rounded-md flex justify-between px-2 py-1",
            "bg-white"
          )}
        >
          {server?.name}
          <Icon path={mdiMenuDown} size={1} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {(isModerator || isAdmin) && (
          <>
            <DropdownMenuItem className="flex justify-between w-full py-1 px-2 text-xs">
              Invite People
              <Icon path={mdiAccountPlus} size={0.8} />
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem className="flex justify-between w-full py-1 px-2 text-xs">
              Server Settings
              <Icon path={mdiCog} size={0.8} />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between w-full py-1 px-2 text-xs">
              Manage Member
              <Icon path={mdiAccountMultiple} size={0.8} />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem className="flex justify-between w-full py-1 px-2 text-xs">
          Create channel
          <Icon path={mdiPlus} size={0.8} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
