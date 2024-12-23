import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const mediaRouter = router({
  getMediaItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.mediaItem.findUnique({
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
      })
    ),

  listMediaItems: protectedProcedure
    .input(
      z.object({
        page: z.number().default(0),
        limit: z.number().default(100),
        sortField: z.string().optional(),
        sortDirection: z.enum(['asc', 'desc']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [items, count] = await Promise.all([
        ctx.db.mediaItem.findMany({
          skip: input.page * input.limit,
          take: input.limit,
          orderBy: input.sortField
            ? {
                [input.sortField]: input.sortDirection || 'asc',
              }
            : undefined,
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
        }),
        ctx.db.mediaItem.count(),
      ]);

      return {
        items,
        totalCount: count,
      };
    }),
});
