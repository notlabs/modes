import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpBatchLink, loggerLink, TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleAuthError = (error: unknown) => {
    if (
      error instanceof TRPCClientError &&
      error.data?.code === 'UNAUTHORIZED'
    ) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      navigate(`/login?returnUrl=${returnUrl}`);
      return false;
    }
    return true;
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,

            useErrorBoundary: handleAuthError,
          },
          mutations: {
            retry: false,

            useErrorBoundary: handleAuthError,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: './api',
          headers: () => {
            const token = localStorage.getItem('token');
            return {
              Authorization: token ? `Bearer ${token}` : '',
            };
          },
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
