import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import 'dotenv/config';
import express from 'express';
import { z } from 'zod';
import { prisma } from './db/client';
import { appRouter } from './trpc/root';
import { createContext } from './trpc/router';

expand(dotenv.config());

const envSchema = z.object({
  API_HOST: z.string().default('localhost'),
  API_PORT: z.string().transform((val) => Number(val)),
  DATABASE_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

const app = express();

app.use(cors());

app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const start = async () => {
  // Check if the database is connected
  await prisma.$connect();

  app.listen(env.API_PORT, env.API_HOST, () => {
    // TODO: logging
    console.log(`[ ready ] http://${env.API_HOST}:${env.API_PORT}`);
  });
};

start();
