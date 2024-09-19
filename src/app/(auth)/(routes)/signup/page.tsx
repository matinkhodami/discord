"use client";
import { z } from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { signUpSchema } from "@/Schema/user";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import PopUp from "@/components/Animation/Alert";
import { Input } from "@/components/ui/input";
const signUp = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const res = await axios.post("/api/signup", data);
    console.log(res)
    if ( res.status === 200 ) router.push("/signin");
  };
  return (
    <Form {...form}>
      <motion.form
        layout
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 "
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <PopUp message={errors.name?.message} type="Error" />
            </FormItem>
          )}
        />

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
        <Button type="submit">Sign Up</Button>
      </motion.form>
    </Form>
  );
};

export default signUp;
