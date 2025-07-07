"use client";

import { useEntitySelection } from "@/stores/entity-selection";
import { EmptyEntityState } from "@/components/users/super-admin/states/empty-entity-state";
import { EntityContent } from "@/components/users/super-admin/content/entity-content";

export function EntityContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full p-5 overflow-y-auto bg-sidebar">
      {!selectedEntity && <EmptyEntityState />}
      {selectedEntity && <EntityContent />}
    </div>
  );
}
