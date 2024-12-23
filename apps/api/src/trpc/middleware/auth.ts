import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../router';
import { verifyToken } from '../../utils/auth';
import { AuthErrorCode } from '../../types';

export const authMiddleware = middleware(async ({ ctx, next }) => {
  const token = ctx.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new TRPCError({
      code: AuthErrorCode.UNAUTHORIZED,
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
    const code =
      error instanceof Error && error.message.includes('jwt expired')
        ? 'UNAUTHORIZED'
        : 'FORBIDDEN';

    throw new TRPCError({
      code,
      message: error instanceof Error ? error.message : 'Invalid token',
      cause:
        error instanceof Error && error.message.includes('jwt expired')
          ? AuthErrorCode.TOKEN_EXPIRED
          : AuthErrorCode.TOKEN_INVALID,
    });
  }
});
export const protectedProcedure = publicProcedure.use(authMiddleware);
