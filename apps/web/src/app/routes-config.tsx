import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { DashboardPage } from '../features/dashboard/dashboard-page';
import { CollectionsPage } from '../features/collections/collections-page';
import { CollectionDetailsPage } from '../features/collections/collection-details-page';
import { AppLayout } from './app-layout';
import { BrowsePage } from '../features/browse/browse-page';
import { AdminPage } from '../features/admin/admin-page';

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path={routes.root.path} element={<DashboardPage />} />
      <Route path={routes.collections.path} element={<CollectionsPage />} />

      <Route
        path={routes.collection.path}
        element={<CollectionDetailsPage />}
      />
      <Route path={routes.browse.path} element={<BrowsePage />} />
      <Route path={routes.admin.path} element={<AdminPage />} />
    </Route>
  </Routes>
);
