"use client";
import join from "@/action/join";
import ButtonWrapper from "@/components/Animation/ButtonWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const JoinButton = ({ serverID }: { serverID: string }) => {
  return (
    <ButtonWrapper>
      <Button
        variant="default"
        size="full"
        className="border-2 border-darkPrimary font-bold text-md py-5"
        onClick={async () => {
          await join(serverID);
        }}
      >
        Join Server
      </Button>
    </ButtonWrapper>
  );
};

export default JoinButton;
