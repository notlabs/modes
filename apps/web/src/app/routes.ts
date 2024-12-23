import { lazy } from 'react';
import { z } from 'zod';

export const routes = {
  root: {
    path: '/',
    label: 'Dashboard',
    showInNav: true,
    component: lazy(() =>
      import('../features/dashboard/dashboard-page').then((m) => ({
        default: m.DashboardPage,
      }))
    ),
  },
  collections: {
    path: '/collections',
    label: 'Collections',
    showInNav: true,
    component: lazy(() =>
      import('../features/collections/collections-page').then((m) => ({
        default: m.CollectionsPage,
      }))
    ),
  },
  collection: {
    path: '/collections/:id',
    label: 'Collection Details',
    params: z.object({ id: z.string() }),
    showInNav: false,
    component: lazy(() =>
      import('../features/collections/collection-details-page').then((m) => ({
        default: m.CollectionDetailsPage,
      }))
    ),
  },
  browse: {
    path: '/browse',
    label: 'Browse',
    showInNav: true,
    component: lazy(() =>
      import('../features/browse/browse-page').then((m) => ({
        default: m.BrowsePage,
      }))
    ),
  },
  admin: {
    path: '/admin',
    label: 'Admin',
    showInNav: true,
    component: lazy(() =>
      import('../features/admin/admin-page').then((m) => ({
        default: m.AdminPage,
      }))
    ),
  },
  tags: {
    path: '/tags',
    label: 'Tags',
    showInNav: true,
    component: lazy(() =>
      import('../features/tags/tags-page').then((m) => ({
        default: m.TagsPage,
      }))
    ),
  },
  login: {
    path: '/login',
    label: 'Login',
    showInNav: false,
    component: lazy(() =>
      import('../features/auth/login-page').then((m) => ({
        default: m.LoginPage,
      }))
    ),
  },
} as const;
export type AppRoute = typeof routes;
export type RoutePath = AppRoute[keyof AppRoute]['path'];
export type RouteKeys = keyof AppRoute;

export const createUrl = {
  collection: (id: string) => `/collections/${id}` as const,
  dashboard: () => '/dashboard' as const,
  root: () => '/' as const,
  browse: () => '/browse' as const,
  admin: () => '/admin' as const,
};

export const getRouteParams = {
  collection: (params: Record<string, string | undefined>) =>
    routes.collection.params.parse(params),
};
