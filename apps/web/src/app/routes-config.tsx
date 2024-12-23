import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './app-layout';
import { routes } from './routes';

export const RoutesConfig = () => (
  <Routes>
    <Route element={<AppLayout />}>
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  </Routes>
);
