import { z } from "zod";

export const commentSchema = z.object({
  uuid: z.string(),
  parrent_uuid: z.string().optional(),
  video_uuid: z.string(),
  user_uuid: z.string(),
  message: z.string(),
  created: z.string(),
  users: z.object({
    uuid: z.string(),
    name: z.string(),
  }),
});

export const singleVideoSchema = z.object({
  uuid: z.string().optional(),
  comments: z.array(commentSchema).optional(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  monetized: z.boolean().optional(),
  created: z.string().optional(),
  tag: z.number().optional(),
  users: z
    .object({
      uuid: z.string(),
      name: z.string(),
    })
    .optional(),
  _count: z
    .object({
      liked_videos: z.number(),
      videoView: z.number().optional(),
    })
    .optional(),
  error: z.string().optional(),
});

export const videoSchema = z.object({
  isLikedByUser: z.boolean().optional(),
  video: singleVideoSchema.optional(),
});

export type IVideo = z.infer<typeof videoSchema>;
export type IComment = z.infer<typeof commentSchema>;
export type ISingleVIdeo = z.infer<typeof singleVideoSchema>;
