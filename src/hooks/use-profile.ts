import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileSettings, defaultSettings } from '@/lib/profile-settings';

interface ProfileState {
  profile: {
    name: string;
    title: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  settings: ProfileSettings;
  updateProfile: (profile: Partial<ProfileState['profile']>) => void;
  updateSettings: (settings: Partial<ProfileSettings>) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: {
        name: 'John Smith',
        title: 'Loan Officer',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
      },
      settings: defaultSettings,
      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
    }),
    {
      name: 'profile-storage',
    }
  )
);