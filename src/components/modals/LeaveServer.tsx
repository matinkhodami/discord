"use client";
import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";
import { useRouter } from "next/navigation";

import leaveServer from "@/components/server/lib/leaveServer";

// UI Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const LeaveServer = () => {
  const router = useRouter();
  const {
    type,
    isOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isLeaveModalOpen = isOpen && type === "leaveServer";
  const user = useUserData();
  const handleOnOpen = () => {
    onClose();
  };

  return (
    <Dialog open={isLeaveModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-lightMuted">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Leave <span className="text-darkPrimary">{server?.name}</span>
          </DialogTitle>
          <DialogDescription className="text-md">
            Are you sure you want to leave{" "}
            <span className="text-darkPrimary">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-dark">
          <Button
            size="full"
            onClick={() => {
              handleOnOpen();
            }}
          >
            No
          </Button>
          <Button
            size="full"
            variant="destructive"
            onClick={async () => {
              await leaveServer(server?.id as string, user?.id as string);
              handleOnOpen();
              window.location.reload();
              router.push("/");
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServer;
