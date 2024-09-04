import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string().min(1,"Password is required"),
});

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').min(3),
  email: z.string().email("Invalid Email"),
  password: z.string().min(1, 'Password is required')
});

export { signInSchema, signUpSchema };
