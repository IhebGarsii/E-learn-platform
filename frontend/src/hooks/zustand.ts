import { create } from "zustand";
type Store = {
  tagSearch: string;
  setTagSearch: (tag: string) => void;
  role: string;
  setRole: (role: string) => void;
};
export const useStore = create<Store>((set) => ({
  bears: 0,
  tagSearch: "",
  setTagSearch: (tagSearch) => set({ tagSearch }),
  role: "",
  setRole: (role) => set({ role }),
}));
