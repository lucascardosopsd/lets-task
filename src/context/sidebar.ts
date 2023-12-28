import { create } from "zustand";

interface SidebarStoreState {
  currentLabel: "all" | "important" | "complete" | "common";
}

interface SidebarStoreActions {
  setLabel: (label: "all" | "important" | "complete" | "common") => void;
}

const useSidebarStore = create<SidebarStoreState & SidebarStoreActions>(
  (set) => ({
    currentLabel: "all",
    setLabel: (label) => set(() => ({ currentLabel: label })),
  })
);

export default useSidebarStore;
