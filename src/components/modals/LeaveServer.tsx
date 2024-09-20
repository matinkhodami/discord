"use client";
import useModalStore from "@/hooks/use-modal-store";
// UI Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
const LeaveServer = () => {
  const {
    type,
    isOpen,
    onOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isLeaveModalOpen = isOpen && type === "leaveServer";

  const handleOnOpen = () => {
    onClose();
  };

  return (
    <Dialog open={isLeaveModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-lightMuted">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Invite Your Friends
          </DialogTitle>
        </DialogHeader>
        <Label>
          Leave <span className="text-darkPrimary">{server?.name}</span>
        </Label>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServer;
