import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Entity } from "@/types/entity";

interface EntitySelectionState {
  selectedEntityType: string;
  selectedEntity: Entity | null;
  setEntityType: (type: string) => void;
  setEntity: (entity: Entity) => void;
  clearSelection: () => void;
}

export const useEntitySelection = create<EntitySelectionState>()(
  persist(
    (set) => ({
      selectedEntityType: "",
      selectedEntity: null,
      setEntityType: (type) =>
        set({
          selectedEntityType: type,
        }),
      setEntity: (entity) =>
        set({
          selectedEntity: entity,
        }),
      clearSelection: () =>
        set({
          selectedEntityType: "",
          selectedEntity: null,
        }),
    }),
    {
      name: "entity-selection-storage",
    }
  )
);
