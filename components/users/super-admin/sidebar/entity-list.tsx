import { Entity } from "@/types/entity";
import { SkeletonEntityList } from "@/components/users/super-admin/skeletons/skeleton-entity-list";
import { EmptySidebarEntities } from "@/components/users/super-admin/states/empty-sidebar-entities";
import { EntityItem } from "@/components/users/super-admin/sidebar/entity-item";

interface EntityListProps {
  searchTerm: string;
  isLoadingTypes: boolean;
  isLoadingEntities: boolean;
  typesError: Error | null;
  entities: Entity[];
  total: number;
}

export function EntityList({
  searchTerm,
  entities,
  isLoadingTypes,
  isLoadingEntities,
  typesError,
  total,
}: EntityListProps) {
  const skeletonCount = 5;

  return (
    <>
      {isLoadingTypes ? (
        <div className="overflow-y-auto">
          <SkeletonEntityList count={skeletonCount} />
        </div>
      ) : typesError ? (
        <div className="text-center py-4 text-red-600">
          Error al cargar tipos de entidades
        </div>
      ) : isLoadingEntities ? (
        <div className="overflow-y-auto">
          <SkeletonEntityList count={skeletonCount} />
        </div>
      ) : entities && entities.length === 0 ? (
        <EmptySidebarEntities searchTerm={searchTerm} className="px-3 pt-6" />
      ) : (
        entities?.map((entity) => (
          <div key={entity.id} className="overflow-y-auto h-full">
            <div className="rounded-lg bg-white h-full flex flex-col">
              <div className="p-3 border-b bg-gray-50">
                <p className="text-sm font-medium text-gray-700">
                  Entidades encontradas ({total})
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <EntityItem entity={entity} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
