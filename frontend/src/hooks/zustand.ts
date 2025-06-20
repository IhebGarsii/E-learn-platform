import { create } from "zustand";
type Store = {
  tag: string;
  setTag: (tag: string) => void;
};
export const useStore = create<Store>((set) => ({
  bears: 0,
  tag: "",
  setTag: (tag) => set({ tag }),
}));
