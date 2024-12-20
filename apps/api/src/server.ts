import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';
import { createContext } from './trpc/context';

const app = express();

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Modes API!' });
});

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.listen(3000);
