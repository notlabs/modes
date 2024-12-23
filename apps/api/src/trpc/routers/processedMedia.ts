import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const processedMediaRouter = router({
  getProcessedMedia: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.processedMedia.findUnique({
        where: { id: input.id },
        include: {
          mediaVersion: true,
        },
      })
    ),

  listProcessedMedia: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.processedMedia.findMany({
      include: {
        mediaVersion: true,
      },
    })
  ),
});
