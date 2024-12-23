import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { userSchema } from '../../schemas/user';
import { createToken, hashPassword, verifyPassword } from '../../utils/auth';
import { protectedProcedure } from '../middleware/auth';
import { publicProcedure, router } from '../router';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().optional(),
      })
    )
    .output(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const passwordHash = await hashPassword(input.password);
      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          passwordHash,
          name: input.name || faker.internet.displayName(),
        },
      });
      const token = createToken(user.id);
      return { token };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .output(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (!user) throw new Error('Invalid credentials');

      const valid = await verifyPassword(input.password, user.passwordHash);
      if (!valid) throw new Error('Invalid credentials');

      const token = createToken(user.id);
      return { token };
    }),

  validate: protectedProcedure
    .output(z.object({ user: userSchema }))
    .query(async ({ ctx }) => ({
      user: {
        id: ctx.user.id,
        email: ctx.user.email,
        name: ctx.user.name,
      },
    })),
});
