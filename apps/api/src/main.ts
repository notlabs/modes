import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers/_app';
import { createContext } from './trpc/context';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
