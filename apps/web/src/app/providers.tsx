import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../trpc';
import { ThemeProvider, createTheme } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
            useErrorBoundary: true,
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
