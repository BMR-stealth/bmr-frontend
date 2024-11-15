import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    onboardingCompleted: boolean;
  } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      signIn: async (email: string, password: string) => {
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'John Smith',
            email,
            onboardingCompleted: false,
          },
        });
      },
      signInWithGoogle: async () => {
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            onboardingCompleted: false,
          },
        });
      },
      signUp: async (name: string, email: string, password: string) => {
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            name,
            email,
            onboardingCompleted: false,
          },
        });
      },
      signOut: async () => {
        set({ isAuthenticated: false, user: null });
      },
      completeOnboarding: () => {
        set((state) => ({
          user: state.user
            ? { ...state.user, onboardingCompleted: true }
            : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);