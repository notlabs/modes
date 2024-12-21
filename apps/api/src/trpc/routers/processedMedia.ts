import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const processedMediaRouter = router({
  getProcessedMedia: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.processedMedia.findUnique({
        where: { id: input.id },
        include: {
          mediaVersion: true
        }
      });
    }),

  listProcessedMedia: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.processedMedia.findMany({
        include: {
          mediaVersion: true
        }
      });
    })
});
