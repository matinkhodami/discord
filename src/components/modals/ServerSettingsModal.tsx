"use client";
import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";
import { useRouter } from "next/navigation";

// UI Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Icon from "@mdi/react";
import { mdiCog, mdiContentSaveAll } from "@mdi/js";

const ServerSettingsModal = () => {
  const router = useRouter();
  const {
    type,
    isOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isLeaveModalOpen = isOpen && type === "serverSettings";
  const user = useUserData();
  const handleOnOpen = () => {
    onClose();
  };

  return (
    <Dialog open={isLeaveModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-lightMuted">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Setting <Icon path={mdiCog} size={1} />
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="bg-dark">
          <Button
            size="full"
          >
            Save <Icon path={mdiContentSaveAll} size={1} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettingsModal;
