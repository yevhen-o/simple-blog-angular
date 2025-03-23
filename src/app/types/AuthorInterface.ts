import { z } from "zod";

export const PostAuthorSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  first_name: z.string().min(3).max(256),
  last_name: z.string().min(3).max(256),
  author_id: z.string().min(3).max(256),
  image_url: z.string().optional(),
  short_bio: z.string().optional(),
  email: z.string(),
});

export const PostAuthorCreateSchema = PostAuthorSchema.pick({
  first_name: true,
  last_name: true,
  image_url: true,
  short_bio: true,
});

export type PostAuthorCreateInterface = z.infer<typeof PostAuthorCreateSchema>;

export type PostAuthorInterface = z.infer<typeof PostAuthorSchema>;
