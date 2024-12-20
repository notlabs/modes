import { initTRPC } from '@trpc/server';
import type { PrismaClient } from '@prisma/client';
import { prisma } from '../db/client';

type Context = {
  db: PrismaClient;
};

const t = initTRPC.context<Context>().create();

export const createContext = () => ({
  db: prisma,
});

export const router = t.router;
export const publicProcedure = t.procedure;
