import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const mediaRouter = router({
  getMediaItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.mediaItem.findUnique({
        where: { id: input.id },
        include: {
          mediaVersions: {
            include: {
              processedMedia: true,
              mediaTags: {
                include: { tag: true }
              }
            }
          }
        }
      });
    }),
  
  listMediaItems: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.mediaItem.findMany({
        include: {
          mediaVersions: {
            include: {
              processedMedia: true
            }
          }
        }
      });
    })
});
