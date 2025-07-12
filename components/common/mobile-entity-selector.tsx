"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import { SearchInput } from "@/components/common/search-input";
import { useEntities, useEntityTypes } from "@/hooks/use-entities";
import { EntityList } from "@/components/users/super-admin/sidebar/entity-list";
import { EntityTypeSelect } from "@/components/users/super-admin/sidebar/entity-type-select";
import { AnimatedPaginator } from "./animated-paginator";

interface MobileEntitySelectorProps {
  title?: string;
  description?: string;
}

export function MobileEntitySelector({
  title,
  description,
}: MobileEntitySelectorProps) {
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { selectedEntity, selectedEntityType } = useEntitySelection();

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
    <Card className="block md:hidden">
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Entidad seleccionada
            </label>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 justify-start bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                >
                  {selectedEntity ? (
                    <div className="flex items-center gap-3 w-full">
                      <Image
                        src={selectedEntity.imgUrl}
                        alt={selectedEntity.name}
                        width={32}
                        height={32}
                        className="size-10 bg-muted rounded-md object-cover flex-shrink-0"
                        unoptimized
                      />
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-medium text-sm lg:text-base truncate">
                          {selectedEntity.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Clic para cambiar entidad
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-xs hidden sm:inline">
                          Cambiar
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Search className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-600">
                          Seleccionar entidad
                        </p>
                        <p className="text-xs text-gray-500">
                          Clic para buscar y seleccionar una entidad
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-xs hidden sm:inline">Abrir</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="sm:w-[420px] sm:max-w-[420px] p-6"
              >
                <div className="space-y-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="space-y-2">
                    <SheetTitle className="text-lg font-semibold">
                      {title ? title : "Seleccionar entidad"}
                    </SheetTitle>
                    <SheetDescription className="text-sm text-gray-600">
                      {description
                        ? description
                        : "Busca y selecciona la entidad a la que necesitas gestionar sus usuarios"}
                    </SheetDescription>
                  </div>

                  {/* Filters */}
                  <div className="space-y-4">
                    <div>
                      <EntityTypeSelect entityTypes={entityTypes.types} />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Buscar entidad
                      </label>
                      <SearchInput
                        placeholder="Buscar entidad por nombre..."
                        searchTerm={searchTerm}
                        onSearch={setSearchTerm}
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex-1 min-h-0">
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
                  </div>

                  {/* Footer con información */}
                  <div className="border-t pt-4">
                    <AnimatedPaginator
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      totalPages={entitiesData?.pageCount ?? 0}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
