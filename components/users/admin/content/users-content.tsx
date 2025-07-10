"use client";

import { useState } from "react";
import { FilterSelect } from "@/components/common/filter-select";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ACTIVE_STATUS_OPTIONS,
  EMAIL_VERIFIED_OPTIONS,
} from "@/constants/entities";
import { User } from "@/types/user";
import { useEntitySelection } from "@/stores/entity-selection";
import { DataTable } from "@/components/ui/data-table";
import { getUserColumns } from "@/components/users/super-admin/table/user-columns";
import { useUsersByEntity } from "@/hooks/use-users";
import { UserDialog } from "@/components/users/super-admin/content/user-dialog";
import { Paginator } from "@/components/common/paginator";
import { deleteUser } from "@/utils/users";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_BY_ENTITY_QUERY_KEY } from "@/constants/queries";
import { AlertDialogConfirm } from "@/components/common/alert-dialog-confirm";
import { useAreasByEntity } from "@/hooks/use-areas";

interface UserFilters {
  search: string;
  isEmailVerified: string;
  active: string;
  page: number;
  limit: number;
}

export function UsersContent() {
  const queryClient = useQueryClient();
  const { selectedEntity } = useEntitySelection();

  // States for create and edit dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  // States for alert dialog
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const { data: areasData } = useAreasByEntity({
    entityId: selectedEntity!.id,
  });

  const handleNewUser = () => {
    setUserToEdit(null); // create mode
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user); // edit mode
    setOpenDialog(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);

    try {
      await deleteUser(userToDelete.id);
      toast.success("Usuario eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: [USER_BY_ENTITY_QUERY_KEY] });
      setUserToDelete(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Error al eliminar usuario");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getUserColumns(handleEditUser, setUserToDelete);

  return (
    <>
      <AlertDialogConfirm
        open={!!userToDelete}
        onClose={(open) => {
          if (!open) setUserToDelete(null);
        }}
        onConfirm={handleDeleteUser}
        loading={isDeleting}
        title="Eliminar usuario"
        description={`¿Estás seguro de que deseas eliminar a ${userToDelete?.fullName}? Esta acción no se puede deshacer.`}
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
                  Usuarios - {selectedEntity?.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Gestiona los usuarios de {selectedEntity?.name}
                </p>
              </div>
            </div>
            <Button onClick={handleNewUser}>Nuevo usuario</Button>
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

            <FilterSelect
              placeholder="Correo verificado"
              options={EMAIL_VERIFIED_OPTIONS}
              value={filters.isEmailVerified}
              onValueChange={(value) =>
                updateFilters({ isEmailVerified: value })
              }
            />
            <FilterSelect
              placeholder="Estado"
              options={ACTIVE_STATUS_OPTIONS}
              value={filters.active}
              onValueChange={(value) => updateFilters({ active: value })}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <DataTable
            isLoading={isLoading}
            columns={columns}
            data={usersData?.users ?? []}
          />
          <Paginator
            currentPage={filters.page}
            totalPages={Math.ceil((usersData?.total ?? 0) / filters.limit)}
            limit={filters.limit}
            onPageChange={(page) => updateFilters({ page })}
            onLimitChange={(limit) => updateFilters({ limit })}
          />
        </CardContent>
      </Card>

      {/* Dialog to create and edit user */}
      <UserDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        userToEdit={userToEdit}
        areas={areasData?.areas ?? []}
      />
    </>
  );
}
