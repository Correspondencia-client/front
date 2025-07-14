import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RequestHistoryItem } from "@/types/requests";

interface HistoryState {
  selectedHistoryItem: RequestHistoryItem | null;
  setHistoryItem: (item: RequestHistoryItem) => void;
  clearHistoryItem: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      selectedHistoryItem: null,
      setHistoryItem: (item) =>
        set({
          selectedHistoryItem: item,
        }),
      clearHistoryItem: () =>
        set({
          selectedHistoryItem: null,
        }),
    }),
    {
      name: "request-history-storage",
    }
  )
);
