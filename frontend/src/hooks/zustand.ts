import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  tagSearch: string;
  setTagSearch: (tag: string) => void;
  role: string;
  setRole: (role: string) => void;
  onlineUsersId: string[];
  setOnlineUsersId: (onlineUsersId: string[]) => void;
  userId: string;
  setUserId: (userId: string) => void;
  courseId: string;
  setCourseId: (courseId: string) => void;
  boughtCourses: string[];
  setBoughtCourses: (boughtCourses: string[]) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      tagSearch: "",
      setTagSearch: (tagSearch) => set({ tagSearch }),
      role: "",
      setRole: (role) => set({ role }),
      onlineUsersId: [],
      setOnlineUsersId: (onlineUsersId) => set({ onlineUsersId }),
      userId: "",
      setUserId: (userId) => set({ userId }),
      courseId: "",
      setCourseId: (courseId) => set({ courseId }),
      boughtCourses: [],
      setBoughtCourses: (boughtCourses) => set({ boughtCourses }),
    }),
    {
      name: "e-learn-store", // Key in localStorage
      partialize: (state) => ({
        boughtCourses: state.boughtCourses,
      }),
    }
  )
);
