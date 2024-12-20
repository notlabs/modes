import { inferAsyncReturnType } from '@trpc/server';
import { prisma } from '../db/client';

export const createContext = async () => {
  return {
    db: prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
