"use client";

import { EntityInfo } from "@/components/common/entity-info";
import { useEntitySelection } from "@/stores/entity-selection";
import { EntityInfoSkeleton } from "@/components/users/admin/skeletons/entity-info-skeleton";

export function EntityInfoSidebar() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="hidden md:flex w-80 h-full shrink-0 rounded-none border-r py-6 px-3">
      {selectedEntity ? (
        <EntityInfo className="relative bg-muted shadow-none border h-full" />
      ) : (
        <EntityInfoSkeleton className="bg-muted/50 border shadow-none" />
      )}
    </div>
  );
}
