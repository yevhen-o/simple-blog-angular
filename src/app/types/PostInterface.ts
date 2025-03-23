import { z } from 'zod';

import { PostAuthorSchema } from './AuthorInterface';

const PostAuthorResponseSchema = PostAuthorSchema.pick({
  first_name: true,
  last_name: true,
  author_id: true,
});

export type PostAuthorInterface = z.infer<typeof PostAuthorSchema>;

export const PostValidationSchema = z.object({
  slug: z.string().min(1).max(256),
  created_at: z.string(),
  title: z.string().min(3).max(256),
  content: z.string().min(15).max(1000),
  author: PostAuthorResponseSchema,
  author_id: z.string().min(3).max(256),
  tags: z.array(z.string()).describe('List of tags').optional(),
  countCommas: z.number().optional(),
  countDots: z.number().optional(),
  image_url: z.string().optional(),
});

export type PostInterface = z.infer<typeof PostValidationSchema>;

export const BlogPostsValidationSchema = z.array(PostValidationSchema);
export const FirebasePostsSchema = z.record(z.string(), PostValidationSchema);
export type FirebasePostInterface = z.infer<typeof FirebasePostsSchema>;
