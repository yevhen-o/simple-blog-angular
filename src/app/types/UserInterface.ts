import { z } from "zod";

export const UserValidationSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(256),
  username: z
    .string()
    .min(3)
    .max(256)
    .regex(/^\S*$/, "Username must not contain spaces"),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
    phone: z.string().optional(),
    website: z.string().optional(),
    company: z
      .object({
        name: z.string(),
        catchPhrase: z.string(),
        bs: z.string(),
      })
      .optional(),
  }),
});

export type UserInterface = z.infer<typeof UserValidationSchema>;

export const UserListValidationSchema = z.array(UserValidationSchema);
