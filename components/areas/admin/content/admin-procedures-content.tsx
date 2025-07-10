"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import { DataTable } from "@/components/ui/data-table";
import { Paginator } from "@/components/common/paginator";
import { useQueryClient } from "@tanstack/react-query";
import { AREAS_QUERY_KEY, ENTITIES_QUERY_KEY } from "@/constants/queries";
import { AlertDialogConfirm } from "@/components/common/alert-dialog-confirm";
import { useAreasByEntity } from "@/hooks/use-areas";
import { deleteArea } from "@/utils/areas";
import { AreaSelect } from "@/components/areas/admin/content/area-select";
import { useAreaSelection } from "@/stores/area-selection";
import { ProcedureDialog } from "@/components/areas/admin/content/procedure-dialog";
import { Procedure } from "@/types/procedure";
import { getProcedureColumns } from "@/components/areas/admin/table/procedure-columns";

interface AreaFilters {
  search: string;
  page: number;
  limit: number;
}

export function AdminProceduresContent() {
  const queryClient = useQueryClient();
  const { selectedEntity } = useEntitySelection();
  const { setArea, selectedArea } = useAreaSelection();

  // States for create and edit dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [procedureToEdit, setProcedureToEdit] = useState<Procedure | null>(
    null
  );

  // States for alert dialog
  const [areaToDelete, setAreaToDelete] = useState<Procedure | null>(null);
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

  useEffect(() => {
    if (areaData?.areas && areaData.areas.length > 0 && !selectedArea) {
      setArea(areaData.areas[0]);
    }
  }, [areaData?.areas, selectedArea, setArea]);

  const updateFilters = (newFilters: Partial<AreaFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  };

  const handleNewProcedure = () => {
    setProcedureToEdit(null); // create mode
    setOpenDialog(true);
  };

  const handleEditProcedure = (procedure: Procedure) => {
    setProcedureToEdit(procedure); // edit mode
    setOpenDialog(true);
  };

  const handleDeleteProcedure = async () => {
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
      setAreaToDelete(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Error al eliminar el area");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getProcedureColumns(handleEditProcedure, setAreaToDelete);

  return (
    <>
      <AlertDialogConfirm
        open={!!areaToDelete}
        onClose={(open) => {
          if (!open) setAreaToDelete(null);
        }}
        onConfirm={handleDeleteProcedure}
        loading={isDeleting}
        title="Eliminar procedimiento"
        description={`¿Estás seguro de que deseas eliminar el procedimiento ${areaToDelete?.name}? Esta acción no se puede deshacer.`}
      />
      <Card className="shadow-none border">
        <CardHeader className="gap-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-1">
              <img
                src={selectedEntity?.imgUrl}
                alt={`Images de la entidad ${selectedEntity?.name}`}
                className="w-auto h-16 bg-muted rounded-md object-contain select-none flex-shrink-0"
              />
              <div>
                <CardTitle className="flex items-center gap-2">
                  Procesos - {selectedEntity?.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Gestiona los procedimientos de {selectedEntity?.name}
                </p>
              </div>
            </div>
          </div>

          <AreaSelect areas={areaData?.areas ?? []} />

          {/* Filters */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="lg:min-w-[300px] max-lg:w-full">
              <SearchInput
                searchTerm={filters.search}
                placeholder="Buscar por nombre..."
                onSearch={(searchTerm) => updateFilters({ search: searchTerm })}
              />
            </div>
            <Button onClick={handleNewProcedure} className="max-lg:w-full">Nuevo procedimiento</Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <DataTable isLoading={isLoading} columns={columns} data={[]} />
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
      <ProcedureDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        procedureToEdit={procedureToEdit}
      />
    </>
  );
}
