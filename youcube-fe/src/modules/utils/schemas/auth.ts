import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(4).max(20),
});

export type ILogin = z.infer<typeof signInSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
