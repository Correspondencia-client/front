"use client";

import { useEffect, useState } from "react";
import { useEntitySelection } from "@/stores/entity-selection";
import { SearchInput } from "@/components/common/search-input";
import { useEntities, useEntityTypes } from "@/hooks/use-entities";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedPaginator } from "@/components/common/animated-paginator";
import { EntityTypeSelect } from "@/components/users/super-admin/sidebar/entity-type-select";
import { EntityList } from "@/components/users/super-admin/sidebar/entity-list";
import { cn } from "@/lib/utils";

export function CitizenRequestSidebar() {
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedEntityType, selectedEntity, setEntityType, setEntity } =
    useEntitySelection();

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

  useEffect(() => {
    if (!selectedEntityType && entityTypes.types.length > 0) {
      setEntityType(entityTypes.types[0]);
    }
  }, [entityTypes.types, selectedEntityType, setEntityType]);

  useEffect(() => {
    if (!selectedEntity && entities.length > 0) {
      setEntity(entities[0]);
    }
  }, [entities, selectedEntity, setEntity]);

  return (
    <Card className="hidden md:flex w-80 h-full shrink-0 rounded-none border-r">
      <CardHeader className="gap-3">
        <div className="space-y-2 mb-3">
          <CardTitle>Información de la entidad</CardTitle>
          <CardDescription>
            Seleccione el tipo de entidad y la entidad específica a la que desea
            dirigir su solicitud.
          </CardDescription>
        </div>
        <EntityTypeSelect entityTypes={entityTypes.types} />
        <SearchInput
          placeholder="Buscar entidad por nombre..."
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="border rounded-lg h-full flex flex-col bg-muted">
          <EntityList
            entities={entities}
            total={entitiesData?.total ?? 0}
            isLoadingEntities={isLoadingEntities}
            isLoadingTypes={isLoadingTypes}
            searchTerm={searchTerm}
            typesError={typesError}
          />
        </div>
      </CardContent>
      <CardFooter className={cn(!selectedEntity && "hidden")}>
        <AnimatedPaginator
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={entitiesData?.pageCount ?? 0}
        />
      </CardFooter>
    </Card>
  );
}
