import { Prisma } from '@prisma/client';
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
        filters: z
          .array(
            z.object({
              field: z.string(),
              value: z.string().optional(),
              operator: z.string(),
            })
          )
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Prisma.MediaItemWhereInput = {
        ...(input.filters?.length && {
          OR: input.filters.map((filter) => {
            if (filter.field === 'tags') {
              return {
                mediaVersions: {
                  some: {
                    mediaTags: {
                      some: {
                        tag: {
                          value: {
                            contains: filter.value,
                            mode: Prisma.QueryMode.insensitive,
                          },
                        },
                      },
                    },
                  },
                },
              };
            }
            return {
              [filter.field]: {
                contains: filter.value,
                mode: Prisma.QueryMode.insensitive,
              },
            };
          }),
        }),
      };

      const [items, count] = await Promise.all([
        ctx.db.mediaItem.findMany({
          where,
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
            createdAt: true,
            createdBy: {
              select: {
                name: true,
                email: true,
              },
            },
            mediaVersions: {
              select: {
                processedMedia: {
                  select: { path: true },
                },
                mediaTags: {
                  select: {
                    tag: { select: { value: true } },
                  },
                },
              },
            },
          },
        }),
        ctx.db.mediaItem.count({ where }),
      ]);

      return { items, totalCount: count };
    }),
});
