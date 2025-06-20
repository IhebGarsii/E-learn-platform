import { create } from "zustand";
type Store = {
  tagSearch: string;
  setTagSearch: (tag: string) => void;
};
export const useStore = create<Store>((set) => ({
  bears: 0,
  tagSearch: "",
  setTagSearch: (tagSearch) => set({ tagSearch }),
}));
