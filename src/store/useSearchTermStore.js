import { create } from 'zustand';

export const useSearchTermStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => {
    set({ searchTerm: term });
  },
}));
