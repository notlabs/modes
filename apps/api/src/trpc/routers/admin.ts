import { z } from 'zod';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';
import { hashPassword } from '../../utils/auth';

export const adminRouter = router({
  listUsers: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
  ),

  setPassword: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        newPassword: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const passwordHash = await hashPassword(input.newPassword);
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { passwordHash },
      });
    }),
});
