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
import { EntityTypeSelect } from "@/components/users/super-admin/sidebar/entity-type-select";
import { EntityList } from "./entity-list";
import { cn } from "@/lib/utils";

export function EntitySidebar() {
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedEntityType, selectedEntity } = useEntitySelection();

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
    <Card className="hidden md:flex w-80 h-full shrink-0 rounded-none border-r">
      <CardHeader className="gap-3">
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
