import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const mediaVersionsRouter = router({
  getMediaVersion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.mediaVersion.findUnique({
        where: { id: input.id },
        include: {
          processedMedia: true,
          mediaTags: {
            include: { tag: true }
          },
          collectionItems: true
        }
      });
    }),

  listMediaVersions: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.mediaVersion.findMany({
        include: {
          processedMedia: true,
          mediaTags: true
        }
      });
    })
});
