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
import axios from "axios";
import { useState } from "react";
import Loader from "../Animation/Loader";

const InviteModal = () => {
  const { isOpen, onClose, type } = useModalStore();
  const { toast } = useToast();

  const [inviteCode, setInviteCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const isCreateServerModelOpen = isOpen && type === "invite";
  const serverData = useModalStore((state) => state.data?.server);

  const handleOnOpen = () => {
    onClose();
  };
  const onNew = async () => {
    setIsLoading(true);
    try {
      const updatedServer = await axios.patch(`/api/servers/${serverData?.id}`);
      if (updatedServer.status === 200) {
        toast({
          title: "Success",
          description: "new server invite code generated!",
        });
      }
      setInviteCode(updatedServer.data.inviteCode);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message as string,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isCreateServerModelOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-dark/90 bg-light px-6 pb-6 shadow-lightPrimary/50 dark:shadow-darkPrimary/20 pt-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light text-lightSecondary dark:text-darkPrimary">
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
        <Label className="text-lightSecondary dark:text-darkSecondary">Server Invite link</Label>
        <div className="flex gap-2">
          <Input
            className="focus-visible:ring-offset-0 focus-visible:ring-0 text-lightSecondary dark:text-darkPrimary"
            value={
              `http://localhost:3000/invite/` + 
              (inviteCode || serverData?.inviteCode || "")
            }
          />
          <Button
            size="icon"
            variant="default"
            onClick={() => {
              window.navigator.clipboard.writeText(
                `http://localhost:3000/invite/` +
                  (inviteCode || serverData?.inviteCode || "")
              );
              toast({
                title: "invite code",
                description: "Copied to clipboard!",
              });
            }}
          >
            <Icon path={mdiContentCopy} size={0.8} />
          </Button>
        </div>
        <Button onClick={onNew}>
          {!isLoading ? (
            <>
              Generate new invite link
              <Icon path={mdiRefresh} size={0.8} className="ml-2" />
            </>
          ) : (
            <Loader />
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
