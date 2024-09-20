import userData from "@/lib/user/userData";
import logout from "@/action/logout";

import Icon from "@mdi/react";
import { mdiFaceMan, mdiLogout } from "@mdi/js";

// UI Components
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
const UserButton = async () => {
  const user = await userData();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-[48px] h-[48px] cursor-pointer">
          <AvatarImage src={user?.image as string | undefined} />
          <AvatarFallback
            className={cn("bg-dark text-darkPrimary font-extrabold text-lg")}
          >
            {user?.name?.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 ml-4">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button size="full" variant="ghost">
            <Icon path={mdiFaceMan} size={1} />
            <span>Profile</span>
            <DropdownMenuShortcut className="ml-auto">
              Ctrl+P
            </DropdownMenuShortcut>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button size="full" variant="ghost" event={logout}>
            <Icon path={mdiLogout} size={1} />
            <span>sign out</span>
            <DropdownMenuShortcut className="ml-auto">
              Ctrl+L
            </DropdownMenuShortcut>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
