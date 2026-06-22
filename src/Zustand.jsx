import { create } from "zustand";

export const useCategory = create((set) => ({
  category: "전체",
  setCategory: (newCategory) => set({ category: newCategory }),
}));

