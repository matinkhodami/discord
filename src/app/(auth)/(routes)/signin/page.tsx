"use client";

import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schemas
import { signInSchema } from "@/Schema/user";

// UI Component
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PopUp from "@/components/Animation/Alert";
import { Button } from "@/components/ui/button";
import login from "@/action/login";



export default function Page() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // TODO: Add login logic in the api folder
    // TODO: Handle error returned by api route
    // TODO: DELETE /action/login file
    const res = await login(data)
  }

  return (
    <Form {...form} >
      <motion.form  
        layout
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <PopUp message={errors.email?.message} type="Error" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <PopUp message={errors.password?.message} type="Error" />
            </FormItem>
          )}
        />
        <Button type="submit">Sign In</Button>
      </motion.form>
    </Form>
  );
}
