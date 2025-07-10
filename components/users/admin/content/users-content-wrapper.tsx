"use client";

import { Entity } from "@/types/entity";
import { EntityInfo } from "@/components/common/entity-info";
import { useEntitySelection } from "@/stores/entity-selection";
import { UsersContent } from "@/components/users/admin/content/users-content";
import { EntityInfoSkeleton } from "@/components/users/admin/skeletons/entity-info-skeleton";
import { UsersTableSkeleton } from "@/components/users/admin/skeletons/users-table-skeleton";

const mockEntity: Entity = {
  id: "1",
  name: "Municipalidad de San José",
  type: "Gobierno Municipal",
  imgUrl: "/placeholder.svg?height=64&width=64",
  active: true,
  description:
    "Entidad gubernamental encargada de la administración y gestión de los servicios públicos del cantón de San José, Costa Rica.",
  phone: "+506 2547-6000",
  createdAt: "2020-01-15T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
  areas: [
    { id: "1", name: "Recursos Humanos" },
    { id: "2", name: "Finanzas" },
    { id: "3", name: "Obras Públicas" },
    { id: "4", name: "Servicios Sociales" },
    { id: "5", name: "Tecnología" },
  ],
};

export function UsersContentWrapper() {
  const { selectedEntity } = useEntitySelection();

  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      {selectedEntity ? (
        <>
          <EntityInfo
            entity={mockEntity}
            className="relative bg-white shadow-none border md:hidden"
          />
          <UsersContent />
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
