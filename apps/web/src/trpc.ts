import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/trpc/root';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // TODO:
      url: 'YOUR_API_URL',
      headers: () => {
        const token = localStorage.getItem('token');
        return {
          Authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});
