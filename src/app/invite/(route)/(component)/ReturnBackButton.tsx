"use client";
import ButtonWrapper from "@/components/Animation/ButtonWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const ReturnBackButton = () => {
  const { push } = useRouter();
  return (
    <ButtonWrapper>
      <Button
        variant="default"
        size="full"
        className="border-2 border-darkPrimary font-bold text-md py-5"
        onClick={() => {
          push("/");
        }}
      >
        continue to discord!
      </Button>
    </ButtonWrapper>
  );
};

export default ReturnBackButton;
