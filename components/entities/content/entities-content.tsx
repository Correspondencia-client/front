"use client";

import { Paginator } from "@/components/common/paginator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useEntities, useEntityTypes } from "@/hooks/use-entities";
import { Entity } from "@/types/entity";
import React, { useState } from "react";
import { getEntityColumns } from "../table/entities-columns";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { EntityTypeSelect } from "@/components/users/super-admin/sidebar/entity-type-select";
import { useEntitySelection } from "@/stores/entity-selection";
import { EmptyEntityState } from "@/components/users/super-admin/states/empty-entity-state";
import { cn } from "@/lib/utils";
import { EntityViewDialog } from "./entity-view-dialog";
import { EntityDialog } from "./entity-dialog";

interface EntityFilters {
  search: string;
  page: number;
  limit: number;
}

export function EntitiesContent() {
  const { selectedEntityType } = useEntitySelection();

  const [filters, setFilters] = useState<EntityFilters>({
    search: "",
    page: 1,
    limit: 10,
  });

  const updateFilters = (newFilters: Partial<EntityFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  };

  const {
    data: entityTypes = { types: [] },
    isLoading: isLoadingTypes,
    error: typesError,
  } = useEntityTypes();

  const { data: entityData, isLoading } = useEntities({
    type: selectedEntityType,
    name: filters.search,
    page: filters.page,
    limit: filters.limit,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<Entity | null>(null);

  const [openView, setOpenView] = useState(false);
  const [entityToView, setEntityToView] = useState<Entity | null>(null);

  const handleEdit = (entity: Entity) => {
    setEntityToEdit(entity);
    setOpenDialog(true);
  };

  const handleView = (entity: Entity) => {
    setEntityToView(entity);
    setOpenView(true);
  };

  const columns = getEntityColumns(handleEdit, handleView);

  return (
    <>
      <Card>
        <CardHeader className="space-y-2">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight lg:max-w-3xl">
              Entidades registradas
            </CardTitle>
            <CardDescription className="text-base">
              Crea, edita o desactiva las entidades registradas en el sistema.
            </CardDescription>
          </div>

          <EntityTypeSelect entityTypes={entityTypes.types} />
          <div
            className={cn(
              "flex flex-wrap gap-4",
              !selectedEntityType && "hidden"
            )}
          >
            <div className="flex-1 min-w-64">
              <SearchInput
                searchTerm={filters.search}
                placeholder="Buscar por nombre o descripción..."
                onSearch={(term) => updateFilters({ search: term })}
              />
            </div>

            <Button
              onClick={() => {
                setEntityToEdit(null);
                setOpenDialog(true);
              }}
            >
              Nueva entidad
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!selectedEntityType ? (
            <EmptyEntityState description="Para gestionar las entidades, primero debes seleccionar un tipo de entidad." />
          ) : (
            <>
              <DataTable
                isLoading={isLoading}
                columns={columns}
                data={entityData?.entities ?? []}
              />
              <Paginator
                currentPage={filters.page}
                totalPages={Math.ceil((entityData?.total ?? 0) / filters.limit)}
                limit={filters.limit}
                onPageChange={(page) => updateFilters({ page })}
                onLimitChange={(limit) => updateFilters({ limit })}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Create and view info dialogs */}
      <EntityViewDialog
        open={openView}
        onOpenChange={setOpenView}
        entity={entityToView}
      />

      <EntityDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        entityToEdit={entityToEdit}
      />
    </>
  );
}
