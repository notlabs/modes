import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const mediaVersionsRouter = router({
  getMediaVersion: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.mediaVersion.findUnique({
        where: { id: input.id },
        include: {
          processedMedia: true,
          mediaTags: {
            include: { tag: true },
          },
          collectionItems: true,
        },
      })
    ),

  listMediaVersions: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.mediaVersion.findMany({
      include: {
        processedMedia: true,
        mediaTags: true,
      },
    })
  ),
});
