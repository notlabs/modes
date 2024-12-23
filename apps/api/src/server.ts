import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/root';
import { createContext } from './trpc/router';

const app = express();

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,

    createContext,
  })
);

app.listen(3000);
