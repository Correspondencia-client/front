import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Area } from "@/types/area"

interface AreaSelectionState {
  selectedArea: Area | null
  setArea: (area: Area) => void
  clearArea: () => void
}

export const useAreaSelection = create<AreaSelectionState>()(
  persist(
    (set) => ({
      selectedArea: null,
      setArea: (area) =>
        set({
          selectedArea: area,
        }),
      clearArea: () =>
        set({
          selectedArea: null,
        }),
    }),
    {
      name: "area-selection-storage",
    },
  ),
)
