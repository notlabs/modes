import type { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { prisma } from '../db/client';

type Context = {
  db: PrismaClient;
  req: CreateNextContextOptions['req'];
};

const t = initTRPC.context<Context>().create();
export const createContext = (opts: CreateNextContextOptions) => ({
  db: prisma,
  req: opts.req,
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
