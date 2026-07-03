import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategory = create(
  persist(
    (set) => ({
      category: "전체",
      setCategory: (category) => set({ category }),
    }),
    {
      name: "category-storage",
    },
  ),
);
