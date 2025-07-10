"use client";

import { useEntitySelection } from "@/stores/entity-selection";
import { EntityInfoSkeleton } from "@/components/users/admin/skeletons/entity-info-skeleton";
import { UsersTableSkeleton } from "@/components/users/admin/skeletons/users-table-skeleton";
import { AdminAreasContent } from "@/components/areas/admin/content/admin-areas-content";

export default function AdminAreasContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full px-3 py-5 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      {selectedEntity ? (
        <>
          <AdminAreasContent />
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
