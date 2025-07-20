"use client";

import { useMyExternalRequests, useMyRequests } from "@/hooks/use-requests";
import React, { useState } from "react";
import { AssignedRequestItem, ExternalRequest } from "@/types/requests";
import { useRequestStatusStore } from "@/stores/request-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssignedRequestCardHeaderSkeleton } from "../../officer/skeleton/assigned-request-card-header-skeleton";
import { Paginator } from "@/components/common/paginator";
import { SearchInput } from "@/components/common/search-input";
import { DataTable } from "@/components/ui/data-table";
import { MyExternalRequestColumns } from "../table/my-external-requests-columns";
import { MyExternalRequestTableSkeleton } from "../skeletons/my-external-request-table-skeleton";
import { request } from "http";
import api from "@/lib/axios";
import { CompleteRequestDialog } from "./completed-request-dialog";
import { CompleteExternalRequestDialog } from "./complete-external-request-dialog";
import { ExternalRequestDetailModal } from "./external-request-detail-modal";
import { useQueryClient } from "@tanstack/react-query";
import { MY_REQUESTS_EXTERNAL_QUERY_KEY } from "@/constants/queries";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MyRequestFilters {
  search: string;
  page: number;
  limit: number;
  subject?: string;
  radicado?: string;
  status?: string;
}

const statusOptions = [
  { label: "Pendiente", value: "PENDING" },
  { label: "Completado", value: "COMPLETED" },
];

export function MyExternalRequestsContent() {
  const queryClient = useQueryClient();

  // Estado para el modal de completada de solicitud
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);

  // Estado para el modal de detalle de solicitud
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Estado para la solicitud seleccionada
  const [selectedRequest, setSelectedRequest] =
    useState<ExternalRequest | null>(null);

  // Filtros para la tabla de solicitudes
  const [filters, setFilters] = useState<MyRequestFilters>({
    status: "PENDING",
    search: "",
    page: 1,
    limit: 10,
  });

  const updateFilters = (newFilters: Partial<MyRequestFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1,
    }));
  };

  const { data: requestData, isLoading: isLoadingRequests } =
    useMyExternalRequests({
      status: filters.status || "PENDING",
      page: filters.page,
      limit: filters.limit,
      subject: filters.subject,
      radicado: filters.radicado,
    });

  const handleMarkAsCompleted = async (request: ExternalRequest) => {
    try {
      setIsLoadingCompleted(true);
      await api.patch(`/request-external/${request.id}/complete`);
      queryClient.invalidateQueries({
        queryKey: [MY_REQUESTS_EXTERNAL_QUERY_KEY],
        exact: false,
      });
      toast.success("Solicitud marcada como completada correctamente.");
    } catch (error) {
      toast.error("Error al completar la solicitud.");
    } finally {
      setIsLoadingCompleted(false);
    }
  };

  const handleOpenCompleteModal = (request: ExternalRequest) => {
    setSelectedRequest(request);
    setIsCompleteModalOpen(true);
  };

  const handleViewRequest = (request: ExternalRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const columns = MyExternalRequestColumns(
    handleViewRequest,
    handleOpenCompleteModal
  );

  return (
    <div className="space-y-6">
      <CompleteExternalRequestDialog
        isLoading={isLoadingCompleted}
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        request={selectedRequest}
        onConfirm={handleMarkAsCompleted}
      />

      <ExternalRequestDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        request={selectedRequest}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            Mis solicitudes externas
          </CardTitle>
          <CardDescription className="text-base">
            Da seguimiento a todas tus solicitudes externas.
          </CardDescription>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 min-w-64">
              <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                <SearchInput
                  searchTerm={filters.subject || ""}
                  placeholder="Buscar por asunto..."
                  onSearch={(subject) => updateFilters({ subject })}
                />

                <SearchInput
                  searchTerm={filters.radicado || ""}
                  placeholder="Buscar por radicado..."
                  onSearch={(radicado) => updateFilters({ radicado })}
                />
              </div>

              <div className="min-w-48">
                <Select
                  value={filters.status}
                  onValueChange={(value) => updateFilters({ status: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoadingRequests && !requestData ? (
            <MyExternalRequestTableSkeleton rowCount={8} />
          ) : (
            <DataTable
              isLoading={false}
              columns={columns}
              data={requestData?.requests ?? []}
            />
          )}

          {requestData?.requests && requestData?.requests.length > 0 && (
            <Paginator
              currentPage={filters.page}
              totalPages={Math.ceil((requestData?.total ?? 0) / filters.limit)}
              limit={filters.limit}
              onPageChange={(page) => updateFilters({ page })}
              onLimitChange={(limit) => updateFilters({ limit })}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
