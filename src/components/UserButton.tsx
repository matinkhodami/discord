import userData from "@/lib/user/userData";
import logout from "@/action/logout";

import Icon from "@mdi/react";
import { mdiFaceMan, mdiLogout } from "@mdi/js";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const UserButton = async () => {
  const user = await userData();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full w-[48px] h-[48px]" asChild></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button size="full" variant="ghost" asChild>
            <Icon path={mdiFaceMan} size={1} />
            <span>Profile</span>
            <DropdownMenuShortcut className="ml-auto">
              Ctrl+P
            </DropdownMenuShortcut>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button size="full" variant="ghost" event={logout} asChild>
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
