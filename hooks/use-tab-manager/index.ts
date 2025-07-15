import { create } from 'zustand';

interface TabState {
  tab: number;
  setTab: (tab: number) => void;
  innerTabs: Record<string, number>;
  setInnerTab: (key: string, tab: number) => void;
}

export const useTabState = create<TabState>((set) => ({
  tab: 0,
  setTab: (tab: number) => set({ tab }),
  innerTabs: {},
  setInnerTab: (key: string, tab: number) =>
    set((state) => ({
      innerTabs: {
        ...state.innerTabs,
        [key]: tab,
      },
    })),
}));
