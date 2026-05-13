"use client";

import { create } from "zustand";

type BlogFiltersState = {
  searchQuery: string;
  selectedTag: string;
  setSearchQuery: (q: string) => void;
  setSelectedTag: (tag: string) => void;
  reset: () => void;
};

export const useBlogFilters = create<BlogFiltersState>((set) => ({
  searchQuery: "",
  selectedTag: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  reset: () => set({ searchQuery: "", selectedTag: "" }),
}));
