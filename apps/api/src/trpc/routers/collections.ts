import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const collectionsRouter = router({
  getCollection: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) =>
      ctx.db.collection.findUnique({
        where: { id: input.id },
        include: {
          collectionVersions: {
            include: {
              collectionItems: {
                include: {
                  mediaVersion: true,
                },
              },
            },
          },
        },
      })
    ),

  listCollections: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.collection.findMany({
      include: {
        collectionVersions: true,
      },
    })
  ),
});
