"use client";

import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { toast } from "@/hooks/use-toast";
import useModalStore from "@/hooks/use-modal-store";
import Icon from "@mdi/react";
import { mdiContentCopy, mdiRefresh } from "@mdi/js";
import { Button } from "../ui/button";



const InviteModal = () => {
  const { isOpen, onClose, type, onOpen } = useModalStore();
  const { toast } = useToast();

  const isCreateServerModelOpen = isOpen && type === "invite";
  const serverData = useModalStore((state) => state.data?.server);
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
          {serverData && (
            <DialogDescription className="flex items-center justify-center">
              <Image
                src={serverData?.imageUrl}
                alt={serverData.name}
                className="rounded-full w-20 h-20"
                width={80}
                height={80}
              />
            </DialogDescription>
          )}
        </DialogHeader>
        <Label>Server Invite link</Label>
        <div className="flex gap-2">
          <Input
            className="focus-visible:ring-offset-0 focus-visible:ring-0 text-primary"
            value={serverData?.inviteCode}
          />
          <Button size="icon" variant="default" onClick={()=>{
            window.navigator.clipboard.writeText(serverData?.inviteCode || "")
            toast({
              title: "invite code",
              description: "Copied to clipboard!",
            })
          }}>
            <Icon path={mdiContentCopy} size={0.8} />
          </Button>
        </div>
        <Button>
          Generate new invite link
          <Icon path={mdiRefresh} size={0.8} className="ml-2" />
          </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
