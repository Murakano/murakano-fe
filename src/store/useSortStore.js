import { create } from 'zustand';

export const useSortStore = create((set) => ({
  sortType: 'popularity',
  setSortType: (sort) => {
    set({ sortType: sort });
  },
}));
