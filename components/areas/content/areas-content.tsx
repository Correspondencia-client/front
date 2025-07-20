"use client";

import { toast } from "sonner";
import { useState } from "react";
import { AxiosError } from "axios";

import { Area } from "@/types/area";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import { DataTable } from "@/components/ui/data-table";
import { Paginator } from "@/components/common/paginator";
import { useQueryClient } from "@tanstack/react-query";
import { AREA_VOLUME_QUERY_KEY, AREAS_QUERY_KEY, ENTITIES_QUERY_KEY } from "@/constants/queries";
import { AlertDialogConfirm } from "@/components/common/alert-dialog-confirm";
import { AreaDialog } from "@/components/areas/content/area-dialog";
import { useAreasByEntity } from "@/hooks/use-areas";
import { getAreaColumns } from "@/components/areas/table/area-columns";
import { deleteArea } from "@/utils/areas";

interface AreaFilters {
  search: string;
  page: number;
  limit: number;
}

export function AreasContent() {
  const queryClient = useQueryClient();
  const { selectedEntity } = useEntitySelection();

  // States for create and edit dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [areaToEdit, setAreaToEdit] = useState<Area | null>(null);

  // States for alert dialog
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filters, setFilters] = useState<AreaFilters>({
    search: "",
    page: 1,
    limit: 10,
  });

  const { data: areaData, isLoading } = useAreasByEntity({
    entityId: selectedEntity!.id,
    name: filters.search,
    limit: filters.limit,
    page: filters.page,
  });

  const updateFilters = (newFilters: Partial<AreaFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  };

  const handleNewArea = () => {
    setAreaToEdit(null); // create mode
    setOpenDialog(true);
  };

  const handleEditArea = (area: Area) => {
    setAreaToEdit(area); // edit mode
    setOpenDialog(true);
  };

  const handleDeleteArea = async () => {
    if (!areaToDelete) return;
    setIsDeleting(true);

    try {
      await deleteArea(areaToDelete.id);
      toast.success("Area eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: [AREAS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [ENTITIES_QUERY_KEY],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: [AREA_VOLUME_QUERY_KEY] });

      setAreaToDelete(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Error al eliminar el area");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getAreaColumns(handleEditArea, setAreaToDelete);

  return (
    <>
      <AlertDialogConfirm
        open={!!areaToDelete}
        onClose={(open) => {
          if (!open) setAreaToDelete(null);
        }}
        onConfirm={handleDeleteArea}
        loading={isDeleting}
        title="Eliminar area"
        description={`¿Estás seguro de que deseas eliminar el area ${areaToDelete?.name}? Esta acción no se puede deshacer.`}
      />
      <Card className="shadow-none border">
        <CardHeader>
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            <div className="flex flex-col md:flex-row items-center gap-1">
              <img
                src={selectedEntity?.imgUrl}
                alt={`Images de la entidad ${selectedEntity?.name}`}
                className="w-auto h-16 bg-muted rounded-md object-contain select-none flex-shrink-0"
              />
              <div>
                <CardTitle className="flex items-center gap-2">
                  Areas - {selectedEntity?.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Gestiona las areas de {selectedEntity?.name}
                </p>
              </div>
            </div>
            <Button onClick={handleNewArea}>Nueva area</Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <SearchInput
                  searchTerm={filters.search}
                  placeholder="Buscar por nombre..."
                  onSearch={(searchTerm) =>
                    updateFilters({ search: searchTerm })
                  }
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={areaData?.areas ?? []}
          />
          <Paginator
            currentPage={filters.page}
            totalPages={Math.ceil((areaData?.total ?? 0) / filters.limit)}
            limit={filters.limit}
            onPageChange={(page) => updateFilters({ page })}
            onLimitChange={(limit) => updateFilters({ limit })}
          />
        </CardContent>
      </Card>

      {/* Dialog to create and edit user */}
      <AreaDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        areaToEdit={areaToEdit}
      />
    </>
  );
}
