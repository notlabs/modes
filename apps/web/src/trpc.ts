import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/trpc/root';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();
