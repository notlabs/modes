import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const tagsRouter = router({
  getTag: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.tag.findUnique({
        where: { id: input.id },
        include: {
          mediaTags: true,
        },
      })
    ),

  listTags: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.tag.findMany({
      include: {
        mediaTags: true,
      },
    })
  ),
});
