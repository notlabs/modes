import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../router';
import { verifyToken } from '../../utils/auth';

export const authMiddleware = middleware(async ({ ctx, next }) => {
  const token = ctx.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Missing authentication token',
    });
  }

  try {
    const { userId } = verifyToken(token);
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error('User not found');

    return next({
      ctx: {
        ...ctx,

        user,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `Invalid token: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    });
  }
});
export const protectedProcedure = publicProcedure.use(authMiddleware);
