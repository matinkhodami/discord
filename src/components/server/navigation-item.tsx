"use client";
import { useParams } from "next/navigation";
import { Server } from "@prisma/client";
import Image from "next/image";
import ActionTooltip from "../public/ActionTooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type NavigationItemProp = { server: Server };
const NavigationItem = ({ server }: NavigationItemProp) => {
  const router = useRouter();
  const { serverID } = useParams();
  const isActive = serverID === server.id;
  return (
    <ActionTooltip label={server.name} align="center" side="right" isActive={isActive}>
      <div
        className={cn(
          "group w-[48px] h-[48px] relative transition-all mx-auto duration-500",
          isActive && "w-[46px] h-[46px]"
        )}
        onClick={() => router.push(`/servers/${server.id}`)}
      >
        <Image
          src={server.imageUrl}
          alt="server picture"
          fill
          className={cn("rounded-full z-30", isActive && "-translate-y-[2px] rounded-[10px]")}
        />
        <span
          className={cn(
            "absolute w-[16px] h-[3px] z-10 bg-black dark:bg-light rounded",
            "transition-all left-1/2 -bottom-2 -translate-x-1/2 -translate-y-0",
            isActive
              ? "w-[48px] h-[48px] -bottom-1/2 -translate-y-1/2 rounded-[10px]"
              : "group-hover:w-[26px]"
          )}
        />
      </div>
    </ActionTooltip>
  );
};

export default NavigationItem;
