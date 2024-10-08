import useModalStore from "@/hooks/use-modal-store";
import useUserData from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { InitialServerSchema } from "@/Schema/server";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveChanges } from "@/action/server/server";

// UI Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
import ErrorWrapper from "@/components/Animation/ErrorWrapper";
import Icon from "@mdi/react";
import { mdiCog, mdiContentSaveAll } from "@mdi/js";
import { useEffect } from "react";

const ServerSettingsModal = () => {
  const router = useRouter();
  const {
    type,
    isOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isLeaveModalOpen = isOpen && type === "serverSettings";
  const user = useUserData();
  const handleOnOpen = () => {
    onClose();
  };
  const form = useForm<z.infer<typeof InitialServerSchema>>({
    resolver: zodResolver(InitialServerSchema),
  });

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  useEffect(() => {
    if (server) {
      form.setValue("name", server?.name as string);
      form.setValue("imageUrl", server?.imageUrl as string);
    }
  }, [form, server]);
  async function onSubmit() {
    const res = await saveChanges(getValues(), server?.id as string);
    if (res.success) {
      router.refresh();
      onClose()
    } 
    // TODO IF success equal to false show error to user 
  }

  return (
    <Dialog open={isLeaveModalOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="bg-light shadow-lightPrimary/50 dark:bg-dark/90 pt-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-light flex justify-center items-center gap-2 dark:text-darkPrimary">
            <Icon path={mdiCog} size={0.8} /> Settings
          </DialogTitle>
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
                    <FormLabel className="dark:text-darkSecondary text-lightSecondary font-light text-base">
                      server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="server name"
                        className="text-lightSecondary dark:text-darkPrimary"
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
        <DialogFooter className="rounded-b-xl bg-lightPrimary/20 p-6">
          <Button
            size="full"
            variant="primary"
            className="py-2"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Save <Icon path={mdiContentSaveAll} size={0.8} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettingsModal;
