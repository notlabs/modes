import { z } from 'zod';
import { userWithRelationsSchema } from '../../schemas/user';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const usersRouter = router({
  getUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(userWithRelationsSchema)
    .query(async ({ ctx, input }) =>
      ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          mediaItems: true,
          collections: true,
          tags: true,
        },
      })
    ),

  listUsers: protectedProcedure
    .output(z.array(userWithRelationsSchema))
    .query(async ({ ctx }) =>
      ctx.db.user.findMany({
        include: {
          mediaItems: true,
          collections: true,
          tags: true,
        },
      })
    ),
});
