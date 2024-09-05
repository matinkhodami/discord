"use client";
import ActionTooltip from "@/components/public/ActionTooltip";
import { Button } from "@/components/ui/button";
import useModalStore from "@/hooks/use-modal-store";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
const NavigationAddButton = () => {
  const { onOpen } = useModalStore();

  // FIXME
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  else {
    return (
      <ActionTooltip align="center" side="right" label="create a new server">
        <Button
          className="w-[48px] h-[48px] rounded-[24px] hover:rounded-[16px] transition-all duration-300 bg-dark text-primary hover:bg-primary hover:text-primary-foreground"
          event={() => onOpen("createServer")}
        >
          <Icon path={mdiPlus} size={1} />
        </Button>
      </ActionTooltip>
    );
  }
};

export default NavigationAddButton;
