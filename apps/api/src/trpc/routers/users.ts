import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const usersRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          mediaItems: true,
          collections: true,
          tags: true
        }
      });
    }),

  listUsers: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.user.findMany({
        include: {
          mediaItems: true,
          collections: true,
          tags: true
        }
      });
    })
});
