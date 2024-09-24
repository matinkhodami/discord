"use client";
import { createChannel } from "@/action/server/server";

import useModalStore from "@/hooks/use-modal-store";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { toast } from "@/hooks/use-toast";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateChannel = () => {
  const {
    type,
    isOpen,
    onClose,
    data: { server },
  } = useModalStore();
  const isCreateChannelOpen = isOpen && type === "createChannel";

  const deleteServerSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Channel name is required!",
      })
      .refine((name) => name !== "general", {
        message: "Channel name cannot be 'general'",
      }),
    channelType: z.nativeEnum(ChannelType),
  });
  // Form hook Setup
  const form = useForm<z.infer<typeof deleteServerSchema>>({
    resolver: zodResolver(deleteServerSchema),
    defaultValues: {
      name: "",
      channelType: "TEXT",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleOnOpen = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<z.infer<typeof deleteServerSchema>> = async (
    data: z.infer<typeof deleteServerSchema>
  ) => {
    try {
      const result = await createChannel(data, server?.id as string);
      if ( result.success ) {
        onClose()
        console.log("[Channel]")
      }
    } catch (err) {
      console.log("[CREATE_CHANNEL]: ", err)
    } finally {
      // nothing for now
    }
  };
  return (
    <Dialog open={isCreateChannelOpen} onOpenChange={handleOnOpen}>
      <DialogContent className="dark:bg-darkSecondary bg-light shadow-lightPrimary/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-light text-center text-lightSecondary">
            Create Channel
          </DialogTitle>
          <DialogDescription className="text-md text-center text-lightSecondary/50">
            in <span className="text-lightPrimary">{server?.name}</span>
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
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Channel name"
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
            <FormField
              control={control}
              name="channelType"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-light text-base">
                      Channel Type
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-lightSecondary/60 text-light rounded-md py-2 font-bold capitalize">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ChannelType).map((item) => (
                            <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                            >
                              {item.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <ErrorWrapper msg={errors.channelType?.message || ""} />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
        <DialogFooter className="dark:bg-dark gap-2">
          <Button
            type="submit"
            size="full"
            variant="primary"
            onClick={async () => {
              await handleSubmit(onSubmit)();
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
