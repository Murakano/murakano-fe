import { create } from 'zustand';

export const useSortStore = create((set) => ({
  sortType: 'recent',
  setSortType: (sort) => {
    set({ sortType: sort });
  },
}));
