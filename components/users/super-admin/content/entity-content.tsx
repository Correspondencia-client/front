"use client";

import { useState } from "react";
import { FilterSelect } from "@/components/common/filter-select";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ACTIVE_STATUS_OPTIONS,
  EMAIL_VERIFIED_OPTIONS,
  LIMIT_OPTIONS,
} from "@/constants/entities";
import { useEntitySelection } from "@/stores/entity-selection";
import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "@/components/users/super-admin/table/user-columns";
import { useUsersByEntity } from "@/hooks/use-users";

interface UserFilters {
  search: string;
  isEmailVerified: string;
  active: string;
  page: number;
  limit: number;
}

export function EntityContent() {
  const { selectedEntity } = useEntitySelection();

  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    isEmailVerified: "all",
    active: "all",
    page: 1,
    limit: 10,
  });

  const updateFilters = (newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  };

  const { data: usersData, isLoading } = useUsersByEntity({
    entityId: selectedEntity?.id,
    isEmailVerified:
      filters.isEmailVerified === "true" || filters.isEmailVerified === "false"
        ? filters.isEmailVerified
        : undefined,
    active:
      filters.active === "true" || filters.active === "false"
        ? filters.active
        : undefined,
    search: filters.search || undefined,
    page: filters.page,
    limit: filters.limit,
  });

  return (
    <Card className="shadow-none border">
      <CardHeader>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <img
              src={selectedEntity?.imgUrl}
              alt={`Images de la entidad ${selectedEntity?.name}`}
              className="w-auto h-16 bg-muted rounded-md object-contain select-none flex-shrink-0"
            />
            <div>
              <CardTitle className="flex items-center gap-2">
                Usuarios - {selectedEntity?.name}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Gestiona los usuarios de {selectedEntity?.name}
              </p>
            </div>
          </div>
          <Button>Nuevo usuario</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <SearchInput
                searchTerm={filters.search}
                placeholder="Buscar por nombre..."
                onSearch={(searchTerm) => updateFilters({ search: searchTerm })}
              />
            </div>
          </div>

          <FilterSelect
            placeholder="Correo verificado"
            options={EMAIL_VERIFIED_OPTIONS}
            value={filters.isEmailVerified}
            onValueChange={(value) => updateFilters({ isEmailVerified: value })}
          />
          <FilterSelect
            placeholder="Estado"
            options={ACTIVE_STATUS_OPTIONS}
            value={filters.active}
            onValueChange={(value) => updateFilters({ active: value })}
          />
          <FilterSelect
            className="w-24"
            options={LIMIT_OPTIONS}
            value={filters.limit.toString()}
            onValueChange={(value) =>
              updateFilters({ limit: Number.parseInt(value) })
            }
          />
        </div>
      </CardHeader>

      <CardContent>
        <DataTable
          isLoading={isLoading}
          columns={userColumns}
          data={usersData?.users ?? []}
        />
      </CardContent>
    </Card>
  );
}
