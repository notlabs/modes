import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const tagsRouter = router({
  getTag: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tag.findUnique({
        where: { id: input.id },
        include: {
          mediaTags: true
        }
      });
    }),

  listTags: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.tag.findMany({
        include: {
          mediaTags: true
        }
      });
    })
});
