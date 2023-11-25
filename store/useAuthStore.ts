import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  authUser?: User;
  isLoading: boolean;
  addUser: (user: User) => void;
  removeUser: () => void;
}

const useAuthStore = create<AuthStore>()((set) => ({
  authUser: undefined,
  isLoading: true,
  addUser: (authUser: User) => set({ authUser, isLoading: false }),
  removeUser: () => set({ authUser: undefined }),
}));

export default useAuthStore;
