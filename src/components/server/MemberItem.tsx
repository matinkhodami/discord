import Icon from "@mdi/react";
import { mdiDotsVertical, mdiChessKing, mdiChessQueen } from "@mdi/js";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { CustomMember } from "@/components/server/lib/getServer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";

const icons = {
    ADMIN: mdiChessKing,
    MODERATOR: mdiChessQueen,
    GUEST: null
}

const MemberItem = ({ member }: { member: CustomMember }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="dark:bg-dark w-10">
        <AvatarImage src={member.profile.image as string} />
        <AvatarFallback>
          {member.profile.name.slice(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="capitalize p-0 m-0 font-bold ">{member.profile.name}</p>
        <p className="p-0 m-0 text-zinc-400">{member.profile.email}</p>
      </div>
      <Icon
        path={icons[member.role] as string}
        size={1}
        className="text-darkPrimary"
      />
      {member.role !== MemberRole.ADMIN && (
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto ring-offset-0 ring-0 focus:ring-0 focus:ring-offset-0">
            <Icon path={mdiDotsVertical} size={0.8} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" className="p-1">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
              <DropdownMenuPortal key="role">
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="px-4">
                    MODERATOR
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4">GUEST</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MemberItem;
