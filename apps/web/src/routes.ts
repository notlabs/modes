import { z } from 'zod';
export const routes = {
  root: {
    path: '/' as const,
    params: null,
  },

  collections: {
    path: '/collections' as const,
    params: null,
  },
  collection: {
    path: '/collections/:id' as const,
    params: z.object({
      id: z.string(),
    }),
  },
} as const;

export type AppRoute = typeof routes;
export type RoutePath = AppRoute[keyof AppRoute]['path'];
export type RouteKeys = keyof AppRoute;

export const createUrl = {
  collection: (id: string) => `/collections/${id}` as const,
  dashboard: () => '/dashboard' as const,
  root: () => '/' as const,
};

export const getRouteParams = {
  collection: (params: Record<string, string | undefined>) =>
    routes.collection.params.parse(params),
};
