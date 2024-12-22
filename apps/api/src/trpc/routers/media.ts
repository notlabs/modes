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
                include: { tag: true },
              },
            },
          },
        },
      });
    }),

  listMediaItems: publicProcedure

    .input(
      z.object({
        page: z.number().default(0),
        limit: z.number().default(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.mediaItem.findMany({
        skip: input.page * input.limit,
        take: input.limit,
        select: {
          id: true,
          originalFileName: true,
          mimeType: true,
          fileSize: true,
          checksum: true,
          mediaVersions: {
            select: {
              processedMedia: {
                select: {
                  path: true,
                },
              },

              mediaTags: {
                select: {
                  tag: {
                    select: {
                      value: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return items;
    }),
});
