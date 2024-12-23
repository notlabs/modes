import { User } from 'apps/api/src/types';
import { createStore } from '../../shared/util';

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = createStore<AuthState>(
  (set) => ({
    user: null,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
  }),
  'auth-store'
);
