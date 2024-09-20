"use client";
import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "@/hooks/use-toast";

const DeleteServer = () => {
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
        path: ["name"],
      }
    );
  // Form hook Setup
  const form = useForm<z.infer<typeof deleteServerSchema>>({
    resolver: zodResolver(deleteServerSchema),
    defaultValues: {
      name: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = form;

  const handleOnOpen = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<z.infer<typeof deleteServerSchema>> = async (
    data: z.infer<typeof deleteServerSchema>
  ) => {
    console.log("DELETE SERVER: ", server?.id);
    const res = await deleteServer(server?.id as string);
    if (res.success) {
      onClose();
      toast({
        title: "Success",
        description: res.message,
        variant: "default",
      });
      router.push("/");
    } else {
      form.reset()
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-lightMuted">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Delete <span className="text-destructive">{server?.name}</span>{" "}
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
            className="flex flex-col gap-4 px-6"
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
        <DialogFooter className="bg-dark gap-2">
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
              await handleSubmit(onSubmit)();
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
