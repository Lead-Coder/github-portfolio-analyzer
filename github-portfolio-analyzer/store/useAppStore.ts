
import { create } from 'zustand';
import { UserRole } from '../types';

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
