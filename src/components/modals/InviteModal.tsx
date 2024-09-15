"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// import { toast } from "@/hooks/use-toast";
import useModalStore from "@/hooks/use-modal-store";

const InviteModal = () => {
  const { isOpen, onClose, type, onOpen } = useModalStore();


  const isCreateServerModelOpen = isOpen && type === "createServer";
  const handleOnOpen = () => {
    onClose();
  };

  return (
    <Dialog open={isCreateServerModelOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Invite Your Friends
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
