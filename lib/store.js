import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user: user }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useLoading = create((set) => ({
  msg: false,
  setMsg: (msg) => set(() => ({ msg: msg })),
}));