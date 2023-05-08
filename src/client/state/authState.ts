import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

type AuthState = {
  jwt: string;
  isAuth: boolean;
  setAuth: (jwt: string) => void;
  reset: () => void;
};

type PersistType<T> = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

const useAuthStore = create<AuthState>(
  (persist as PersistType<AuthState>)(
    (set) => ({
      jwt: '',
      isAuth: false,
      setAuth(newJwt: string) {
        set({
          jwt: newJwt,
          isAuth: true,
        });
      },
      reset() {
        set({
          jwt: '',
          isAuth: false,
        });
      },
    }),
    {
      name: 'auth',
    }
  )
);

export const getAuthState = () => useAuthStore.getState();

export default useAuthStore;
