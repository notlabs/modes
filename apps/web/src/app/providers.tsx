import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink, loggerLink, TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { trpc } from '../trpc';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            useErrorBoundary: (error: unknown) => {
              // Handle auth errors separately from error boundary
              if (
                error instanceof TRPCClientError &&
                error.data?.code === 'UNAUTHORIZED'
              ) {
                const returnUrl = encodeURIComponent(window.location.pathname);
                window.location.href = `/login?returnUrl=${returnUrl}`;
                return false;
              }
              // All other errors should go to error boundary
              return true;
            },
          },
          mutations: {
            retry: false,
            useErrorBoundary: (error: unknown) => {
              if (
                error instanceof TRPCClientError &&
                error.data?.code === 'UNAUTHORIZED'
              ) {
                const returnUrl = encodeURIComponent(window.location.pathname);
                window.location.href = `/login?returnUrl=${returnUrl}`;
                return false;
              }
              return true;
            },
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
        loggerLink({
          enabled: () => import.meta.env.DEV,
        }),
      ],
    })
  );

  const isDev = import.meta.env.DEV;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </HelmetProvider>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
