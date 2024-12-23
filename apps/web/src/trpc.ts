import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'apps/api/src/trpc/root';

// TODO: fix
// export const authLink: TRPCLink<AppRouter> = () => {
//   return ({ op, next }) => {
//     if (op.path.startsWith('auth.')) {
//       op.context.useErrorBoundary = false;
//     }
//     return next(op);
//   };
// };

export const trpc = createTRPCReact<AppRouter>();
