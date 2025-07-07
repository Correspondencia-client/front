"use client";

import { useState } from "react";
import { useEntitySelection } from "@/stores/entity-selection";
import { SearchInput } from "@/components/common/search-input";
import { useEntities, useEntityTypes } from "@/hooks/use-entities";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AnimatedPaginator } from "@/components/common/animated-paginator";
import { EntityItem } from "@/components/users/super-admin/sidebar/entity-item";
import { EntityTypeSelect } from "@/components/users/super-admin/sidebar/entity-type-select";
import { SkeletonEntityList } from "@/components/users/super-admin/skeletons/skeleton-entity-list";

export function EntitySidebar() {
  const limit = 10;
  const skeletonCount = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedEntityType } = useEntitySelection();

  const {
    data: entityTypes = { types: [] },
    isLoading: isLoadingTypes,
    error: typesError,
  } = useEntityTypes();

  const { data: entitiesData, isLoading: isLoadingEntities } = useEntities({
    type: selectedEntityType,
    name: searchTerm,
    page: currentPage,
    limit,
  });

  const entities = entitiesData?.entities ?? [];

  return (
    <Card className="w-80 h-full shrink-0 rounded-none shadow-none border-r">
      <CardHeader className="gap-3">
        <EntityTypeSelect entityTypes={entityTypes.types} />
        <SearchInput
          placeholder="Buscar entidad por nombre..."
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        {isLoadingTypes ? (
          <SkeletonEntityList count={skeletonCount} />
        ) : typesError ? (
          <div className="text-center py-4 text-red-600">
            Error al cargar tipos de entidades
          </div>
        ) : isLoadingEntities ? (
          <SkeletonEntityList count={skeletonCount} />
        ) : entities && entities.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            {searchTerm
              ? `No se encontraron entidades con el criterio de busqueda "${searchTerm}"`
              : !searchTerm && !selectedEntityType
              ? "Selecciona un tipo de entidad"
              : "No hay entidades aún"}
          </div>
        ) : (
          entities?.map((entity) => (
            <EntityItem key={entity.id} entity={entity} />
          ))
        )}
      </CardContent>
      <CardFooter>
        <AnimatedPaginator
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={entitiesData?.pageCount ?? 0}
        />
      </CardFooter>
    </Card>
  );
}
