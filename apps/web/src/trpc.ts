import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/trpc/root';

export const trpc = createTRPCReact<AppRouter>();
