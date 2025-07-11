"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import { DataTable } from "@/components/ui/data-table";
import { useQueryClient } from "@tanstack/react-query";
import {
  AREAS_QUERY_KEY,
  ENTITIES_QUERY_KEY,
  PROCEDURES_QUERY_KEY,
} from "@/constants/queries";
import { AlertDialogConfirm } from "@/components/common/alert-dialog-confirm";
import { useAreasByEntity } from "@/hooks/use-areas";
import { AreaSelect } from "@/components/areas/admin/content/area-select";
import { useAreaSelection } from "@/stores/area-selection";
import { ProcedureDialog } from "@/components/areas/admin/content/procedure-dialog";
import { Procedure } from "@/types/procedure";
import { getProcedureColumns } from "@/components/areas/admin/table/procedure-columns";
import { useProceduresByArea } from "@/hooks/use-procedures";
import { deleteProcedure } from "@/utils/procedures";
import { ProcedureViewDialog } from "@/components/areas/admin/content/procedure-view-dialog";

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
  const [procedureToDelete, setProcedureToDelete] = useState<Procedure | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // States for view procedure
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [procedureToView, setProcedureToView] = useState<Procedure | null>(
    null
  );

  const { data: areaData, isLoading } = useAreasByEntity({
    entityId: selectedEntity!.id,
    name: "",
    limit: 15,
    page: 1,
  });

  const { data: procedureData, isLoading: isLoadingProcedures } =
    useProceduresByArea({
      areaId: selectedArea?.id ?? "",
    });

  useEffect(() => {
    if (areaData?.areas && areaData.areas.length > 0 && !selectedArea) {
      setArea(areaData.areas[0]);
    }
  }, [areaData?.areas, selectedArea, setArea]);

  const handleNewProcedure = () => {
    setProcedureToEdit(null); // create mode
    setOpenDialog(true);
  };

  const handleEditProcedure = (procedure: Procedure) => {
    setProcedureToEdit(procedure); // edit mode
    setOpenDialog(true);
  };

  const handleViewProcedure = (procedure: Procedure) => {
    setProcedureToView(procedure);
    setOpenViewDialog(true);
  };

  const handleDeleteProcedure = async () => {
    if (!procedureToDelete) return;
    setIsDeleting(true);

    try {
      await deleteProcedure(procedureToDelete.id);
      toast.success("Proceso eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: [AREAS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [ENTITIES_QUERY_KEY],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: [PROCEDURES_QUERY_KEY] });
      setProcedureToDelete(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(
        err.response?.data?.message || "Error al eliminar el proceso"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getProcedureColumns(
    handleEditProcedure,
    setProcedureToDelete,
    handleViewProcedure
  );

  return (
    <>
      <AlertDialogConfirm
        open={!!procedureToDelete}
        onClose={(open) => {
          if (!open) setProcedureToDelete(null);
        }}
        onConfirm={handleDeleteProcedure}
        loading={isDeleting}
        title="Eliminar proceso"
        description={`¿Estás seguro de que deseas eliminar el proceso ${procedureToDelete?.name}? Esta acción no se puede deshacer.`}
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

            <Button onClick={handleNewProcedure} className="max-lg:w-full">
              Nuevo proceso
            </Button>
          </div>

          <AreaSelect areas={areaData?.areas ?? []} />
        </CardHeader>

        <CardContent className="space-y-4">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={procedureData?.procedures ?? []}
          />
        </CardContent>
      </Card>

      {/* Dialog to create and edit user */}
      <ProcedureDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        procedureToEdit={procedureToEdit}
      />

      <ProcedureViewDialog
        open={openViewDialog}
        onOpenChange={setOpenViewDialog}
        procedure={procedureToView}
      />
    </>
  );
}
