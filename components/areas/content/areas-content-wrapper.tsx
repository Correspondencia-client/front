"use client";

import { useEntitySelection } from "@/stores/entity-selection";
import { AreasContent } from "@/components/areas/content/areas-content";
import { MobileEntitySelector } from "@/components/common/mobile-entity-selector";
import { EmptyEntityState } from "@/components/users/super-admin/states/empty-entity-state";

export function AreasContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      <MobileEntitySelector />
      {!selectedEntity && (
        <EmptyEntityState
          type="areas"
          description="Para gestionar las áreas, primero debes seleccionar una entidad."
        />
      )}
      {selectedEntity && <AreasContent />}
    </div>
  );
}
