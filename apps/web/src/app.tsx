import { Providers } from './app/providers';
import { AppRoutes } from './app/routes-config';

export const App = () => (
  <Providers>
    <AppRoutes />
  </Providers>
);
