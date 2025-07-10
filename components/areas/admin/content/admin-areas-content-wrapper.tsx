"use client";

import { EntityInfo } from "@/components/common/entity-info";
import { useEntitySelection } from "@/stores/entity-selection";
import { AreasContent } from "@/components/areas/content/areas-content";
import { EntityInfoSkeleton } from "@/components/users/admin/skeletons/entity-info-skeleton";
import { UsersTableSkeleton } from "@/components/users/admin/skeletons/users-table-skeleton";

export default function AdminAreasContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      {selectedEntity ? (
        <>
          <EntityInfo className="relative bg-white shadow-none border md:hidden" />
          <AreasContent />
        </>
      ) : (
        <>
          <EntityInfoSkeleton className="relative bg-white border md:hidden" />
          <UsersTableSkeleton />
        </>
      )}
    </div>
  );
}
