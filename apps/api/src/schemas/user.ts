import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string(),
});

export const userWithRelationsSchema = userSchema.extend({
  mediaItems: z.array(z.any()),
  collections: z.array(z.any()),
  tags: z.array(z.any()),
});

export type User = z.infer<typeof userSchema>;
export type UserWithRelations = z.infer<typeof userWithRelationsSchema>;
