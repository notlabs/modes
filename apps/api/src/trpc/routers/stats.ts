import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const statsRouter = router({
  getOverview: protectedProcedure.query(async ({ ctx }) => {
    const [
      userCount,
      mediaCount,
      mediaVersionCount,
      collectionCount,
      tagCount,
    ] = await ctx.db.$transaction([
      ctx.db.user.count(),
      ctx.db.mediaItem.count(),
      ctx.db.mediaVersion.count(),
      ctx.db.collection.count(),
      ctx.db.tag.count(),
    ]);

    return {
      users: userCount,
      media: mediaCount,
      mediaVersions: mediaVersionCount,
      collections: collectionCount,
      tags: tagCount,
    };
  }),

  getDetailedMediaStats: protectedProcedure.query(async ({ ctx }) => {
    const byMimeType = await ctx.db.mediaItem.groupBy({
      by: ['mimeType'],
      _count: true,
    });

    const byStatus = await ctx.db.mediaVersion.groupBy({
      by: ['status'],
      _count: true,
    });

    return {
      byMimeType,
      byStatus,
    };
  }),
});
