import { router, publicProcedure } from '../trpc/router';
import { z } from 'zod';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.example.findMany();
      return `Hello ${input}! DB has ${result.length} records`;
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.example.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
    }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.example.findUnique({
        where: { id: input }
      });
    })
});
