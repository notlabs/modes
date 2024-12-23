import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const createStore = <T extends object>(
  initializer: Parameters<typeof immer<T>>[0],
  name?: string
) => {
  const middleware = immer(initializer);
  return import.meta.env.DEV
    ? create(devtools(middleware, { name }))
    : create(middleware);
};
