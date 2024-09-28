import Icon from "@mdi/react";
import {
  mdiDotsVertical,
  mdiChessKing,
  mdiChessQueen,
  mdiCheckBold,
} from "@mdi/js";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { CustomMember } from "@/components/server/lib/getServer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import { useState } from "react";
import { changeUserRole } from "@/action/server/server";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useModalStore from "@/hooks/use-modal-store";
import Loader from "../Animation/Loader";
import { cn } from "@/lib/utils";

const icons = {
  ADMIN: mdiChessKing,
  MODERATOR: mdiChessQueen,
  GUEST: null,
};

const MemberItem = ({
  member,
  serverID,
}: {
  member: CustomMember;
  serverID: string;
}) => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const [isMemberLoading, setIsMemberLoading] = useState(false);
  async function handleRole(newRole: MemberRole) {
    if (newRole === member.role) return;
    else {
      try {
        setIsMemberLoading(true);
        const result = await changeUserRole(serverID, member.id, newRole);
        if (result.success) {
          toast({
            variant: "success",
            title: "Role changed successfully",
            description: "Your role has been changed successfully",
          });
          onOpen("manageUser", { server: result.data || undefined });
        }
      } catch (error) {
        console.log("[MANAGE_USER_ROLE]: ", error);
      } finally {
        setIsMemberLoading(false);
      }
    }
  }
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="dark:bg-darkSecondary w-10 bg-lightSecondary shadow-md">
        <AvatarImage src={member.profile.image as string} />
        <AvatarFallback className="text-light">
          {member.profile.name.slice(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="capitalize p-0 m-0 font-bold text-lightSecondary dark:text-darkPrimary">
          {member.profile.name}
        </p>
        <p className="p-0 m-0 text-lightSecondary/60 dark:text-darkPrimary/60">
          {member.profile.email}
        </p>
      </div>
      <Icon
        path={icons[member.role] as string}
        size={0.7}
        className={cn(
          "text-darkPrimary ml-2",
          member.role === MemberRole.ADMIN && "ml-auto",
          member.role === MemberRole.ADMIN && "text-PrimaryIcon",
          member.role === MemberRole.MODERATOR && "text-SecondaryIcon",
        )}
      />
      {member.role !== MemberRole.ADMIN && !isMemberLoading && (
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto ring-offset-0 ring-0 focus:ring-0 focus:ring-offset-0">
            {isMemberLoading ? (
              <Loader />
            ) : (
              <Icon path={mdiDotsVertical} size={0.8} />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" className="p-1">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
              <DropdownMenuPortal key="role">
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="px-4 text-xs"
                    onClick={() => {
                      handleRole(MemberRole.MODERATOR);
                    }}
                  >
                    MODERATOR
                    <Icon path={icons.MODERATOR} size={0.6} />
                    {member.role === MemberRole.MODERATOR && (
                      <Icon
                        path={mdiCheckBold}
                        size={0.6}
                        className="ml-auto"
                      />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-4 text-xs"
                    onClick={() => {
                      handleRole(MemberRole.GUEST);
                    }}
                  >
                    GUEST
                    {member.role === MemberRole.GUEST && (
                      <Icon
                        path={mdiCheckBold}
                        size={0.6}
                        className="ml-auto"
                      />
                    )}
                  </DropdownMenuItem>
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
