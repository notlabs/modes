import { Providers } from './app/providers';
import { AppRoutes } from './routes-config';

export const App = () => (
  <Providers>
    <AppRoutes />
  </Providers>
);
