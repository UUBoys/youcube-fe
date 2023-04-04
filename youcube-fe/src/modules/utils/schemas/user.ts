import { z } from "zod";

export const userSchema = z.object({
  uuid: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export const userSessionSchema = z
  .object({
    jwt: z.string(),
    user: userSchema,
  })
  .optional();

export type IUserSession = z.infer<typeof userSessionSchema>;
