import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  sidebarOpen: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      sidebarOpen: true,
      setAuth: (user, token) => set({ user, token }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      logout: () => set({ user: null, token: null }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'tripstory-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
