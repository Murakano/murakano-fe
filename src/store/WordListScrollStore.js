import { create } from 'zustand';

export const WordListScrollStore = create((set) => ({
  scrollPosition: 0,
  setScrollPosition: (position) => set({ scrollPosition: position }),
}));

WordListScrollStore.subscribe((scrollPosition) => console.log('Zustand scrollPosition updated:', scrollPosition));
