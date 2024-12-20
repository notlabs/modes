import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/routers/_app';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();
