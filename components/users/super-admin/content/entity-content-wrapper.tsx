"use client";

import { useEntitySelection } from "@/stores/entity-selection";
import { EmptyEntityState } from "@/components/users/super-admin/states/empty-entity-state";
import { EntityContent } from "@/components/users/super-admin/content/entity-content";
import { MobileEntitySelector } from "@/components/common/mobile-entity-selector";

export function EntityContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      <MobileEntitySelector />
      {!selectedEntity && (
        <EmptyEntityState
          description="Para gestionar los usuarios, primero debes seleccionar una entidad."
        />
      )}
      {selectedEntity && <EntityContent />}
    </div>
  );
}
