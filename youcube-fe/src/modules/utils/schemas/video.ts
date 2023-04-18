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

export const videoSchema = z.object({
  uuid: z.string(),
  comments: z.array(commentSchema),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  monetized: z.boolean(),
  created: z.string(),
  tag: z.number(),
  users: z.object({
    uuid: z.string(),
    name: z.string(),
  }),
  videoView: z.array(
    z.object({
      uuid: z.string(),
      created: z.string(),
    })
  ),
  _count: z.object({
    liked_videos: z.number(),
  }),
  error: z.string().optional(),
});

export type IVideo = z.infer<typeof videoSchema>;
export type IComment = z.infer<typeof commentSchema>;
