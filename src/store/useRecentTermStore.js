import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecentTermStore = create(
  persist(
    (set) => ({
      recentTerm: [],
      setRecentTerm: (term) => {
        set({ recentTerm: term });
      },
    }),
    {
      name: 'recent-term-storage',
      whitelist: ['recentTerm'],
    }
  )
);
