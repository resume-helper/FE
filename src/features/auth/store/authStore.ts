import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "@/features/auth/types/auth";

interface AuthState {
  user: UserResponse | null;
  hasSession: boolean;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
  setHasSession: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasSession: false,
      setUser: (user) => set({ user, hasSession: true }),
      clearUser: () => set({ user: null, hasSession: false }),
      setHasSession: (value) => set({ hasSession: value }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
