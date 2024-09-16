"use client";
import ActionTooltip from "@/components/public/ActionTooltip";
import { Button } from "@/components/ui/button";
import useModalStore from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
const NavigationAddButton = () => {
  const { onOpen } = useModalStore();

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  else {
    return (
      <ActionTooltip align="center" side="right" label="create a new server">
        <Button
          className={cn(
            "w-[48px] h-[48px] rounded-[24px] hover:rounded-[16px] transition-all duration-300 ",
            "dark:bg-dark dark:text-darkPrimary bg-lightPrimary text-dark hover:bg-lightPrimary hover:text-dark"
          )}
          event={() => onOpen("createServer")}
        >
          <Icon path={mdiPlus} size={1} />
        </Button>
      </ActionTooltip>
    );
  }
};

export default NavigationAddButton;
