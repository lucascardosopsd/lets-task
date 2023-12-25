import { create } from "zustand";

interface SidebarStoreState {
  currentLabel: string;
}

interface SidebarStoreActions {
  setLabel: (label: string) => void;
}

const useSidebarStore = create<SidebarStoreState & SidebarStoreActions>(
  (set) => ({
    currentLabel: "all",
    setLabel: (label) => set(() => ({ currentLabel: label })),
  })
);

export default useSidebarStore;
