"use client";
import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { deleteServer } from "@/action/server/server";

// UI Components
import ErrorWrapper from "@/components/Animation/ErrorWrapper";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const DeleteServer = () => {
  const user = useUserData();
  const router = useRouter();
  const {
    type,
    isOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isDeleteModalOpen = isOpen && type === "deleteServer";

  const deleteServerSchema = z
    .object({
      name: z.string().min(1, {
        message: "Name is required",
      }),
    })
    .refine(
      (data) => {
        return data.name === server?.name;
      },
      {
        message: "Name does not match",
      }
    );
  // Form hook Setup
  const form = useForm<z.infer<typeof deleteServerSchema>>({
    resolver: zodResolver(deleteServerSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleOnOpen = () => {
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof deleteServerSchema>) => {
    const res = await deleteServer(server?.id as string);
  };
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-lightMuted">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Delete <span className="text-destructive">{server?.name}</span>
            Server
          </DialogTitle>
          <DialogDescription className="text-md">
            Are you sure you want to delete{" "}
            <span className="text-destructive">{server?.name}</span> server?
            This action cannot be undone!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light text-base">
                      server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="server name"
                        type="text"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <ErrorWrapper msg={errors.name?.message || ""} />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <DialogFooter className="bg-dark">
          <Button
            type="reset"
            size="full"
            onClick={() => {
              handleOnOpen();
            }}
          >
            No
          </Button>
          <Button
            type="submit"
            size="full"
            variant="destructive"
            onClick={async () => {
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

export default DeleteServer;
