import { z } from 'zod';
import { publicProcedure, router } from '../router';

export const collectionsRouter = router({
  getCollection: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.collection.findUnique({
        where: { id: input.id },
        include: {
          collectionVersions: {
            include: {
              collectionItems: {
                include: {
                  mediaVersion: true
                }
              }
            }
          }
        }
      });
    }),

  listCollections: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.collection.findMany({
        include: {
          collectionVersions: true
        }
      });
    })
});
