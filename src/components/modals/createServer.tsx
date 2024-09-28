"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import z from "zod";
// importing ui component
import ErrorWrapper from "@/components/Animation/ErrorWrapper";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { InitialServerSchema } from "@/Schema/server";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DropZoneFile from "@/components/DropZoneFile";

import { toast } from "@/hooks/use-toast";
import useModalStore from "@/hooks/use-modal-store";

const CreateServerModal = () => {
  const { isOpen, onClose, type, onOpen } = useModalStore();

  const form = useForm<z.infer<typeof InitialServerSchema>>({
    resolver: zodResolver(InitialServerSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof InitialServerSchema>) => {
    const res = await axios.post("/api/servers", data);
    if (res.status === 200) {
      toast({
        title: "success",
        description: "Server created successfully",
      });
      window.location.reload();
    }
  };

  const isCreateServerModelOpen = isOpen && type === "createServer";
  const handleOnOpen = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isCreateServerModelOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary shadow-lightPrimary/50 bg-light">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-lightSecondary">
            Create a new server
          </DialogTitle>
          <DialogDescription className="text-lightSecondary/50 text-center">
            Give your server a personality with a name and an image. You can
            always change later!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-6"
          >
            <FormField
              control={control}
              name="imageUrl"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <DropZoneFile
                        value={field.value}
                        onChange={field.onChange}
                        endPoint="serverImage"
                      />
                    </FormControl>
                    <ErrorWrapper msg={errors.imageUrl?.message || ""} />
                  </FormItem>
                );
              }}
            />
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
        <DialogFooter className="dark:bg-dark">
          <Button
            className="w-full"
            type="submit"
            variant="primary"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
