import { create } from 'zustand';

interface ProfileSettingsState {
  isOpen: boolean;
  activeTab: string;
  openProfileSettings: () => void;
  closeProfileSettings: () => void;
  setActiveTab: (tab: string) => void;
}

export const useProfileSettings = create<ProfileSettingsState>((set) => ({
  isOpen: false,
  activeTab: 'profile',
  openProfileSettings: () => set({ isOpen: true }),
  closeProfileSettings: () => set({ isOpen: false }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));