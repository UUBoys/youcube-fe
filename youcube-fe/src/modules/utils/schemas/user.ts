import { z } from "zod";

import { singleVideoSchema } from "./video";

export const userSchema = z.object({
  uuid: z.string(),
  email: z.string().email(),
  name: z.string(),
  videos: z.array(singleVideoSchema).optional(),
  liked_videos: z.array(singleVideoSchema).optional(),
});

export const userSessionSchema = z
  .object({
    jwt: z.string().optional(),
    user: userSchema.optional(),
  })
  .optional();

export type IUserSession = z.infer<typeof userSessionSchema>;
export type IUser = z.infer<typeof userSchema>;
