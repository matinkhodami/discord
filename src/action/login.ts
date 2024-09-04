"use server";

import { signIn } from "@/auth/auth";
import { signInSchema } from "@/Schema/user";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const login = async (data: z.infer<typeof signInSchema>) => {
  try {
    const res = await signIn("credentials", data);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials", success: false };
        default:
          return { error: "Something went wrong", success: false };
      }
    }
  }
  redirect("/");
};

export default login;
