import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { Providers } from './app/providers';
import { RoutesConfig } from './app/routes-config';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './app/error-fallback';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <BrowserRouter>
            <Providers>
              <RoutesConfig />
            </Providers>
          </BrowserRouter>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </StrictMode>
);
