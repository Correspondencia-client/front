"use client";

import {
  useMyAssignedRequests,
  useMyAssignedRequestsCountByStatus,
} from "@/hooks/use-requests";
import { RequestsStatusCard } from "@/components/requests/officer/content/requests-status-card";
import { statusConfig } from "@/constants/requests";
import { useRequestStatusStore } from "@/stores/request-status";
import { RequestsStatusCardSkeleton } from "../skeleton/request-status-card-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getAssignedRequestColumns } from "../table/assigned-request-columns";
import { AssignedRequestItem, RequestStatus } from "@/types/requests";
import { useState, useTransition } from "react";
import { Paginator } from "@/components/common/paginator";
import { RequestDetailModal } from "./request-detail-modal";
import { AssignedRequestTableSkeleton } from "../skeletons/assigned-request-table-skeleton";
import { AssignedRequestCardHeaderSkeleton } from "../skeleton/assigned-request-card-header-skeleton";
import { RequestReplyModal } from "./request-reply-modal";
import { toast } from "sonner";
import { CompleteRequestDialog } from "./completed-request-dialog";
import api from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
} from "@/constants/queries";

interface MyRequestFilters {
  search: string;
  page: number;
  limit: number;
}

export function MyRequestsContent() {
  const queryClient = useQueryClient();
  const { status } = useRequestStatusStore();

  const [isLoadingCompleted, startTransition] = useTransition();

  // Estado para el modal de detalle de solicitud
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Estado para la solicitud seleccionada
  const [selectedRequest, setSelectedRequest] =
    useState<AssignedRequestItem | null>(null);

  // Estado para el modal de completada de solicitud
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // Estado para el modal de respuesta
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // Filtros para la tabla de solicitudes
  const [filters, setFilters] = useState<MyRequestFilters>({
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

  const { data: countsByStatus, isLoading: isLoadingCounts } =
    useMyAssignedRequestsCountByStatus();

  const { data: requestData, isLoading: isLoadingRequests } =
    useMyAssignedRequests({
      status: status || "PENDING",
      page: filters.page,
      limit: filters.limit,
    });

  const handleViewRequest = (request: AssignedRequestItem) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const handleReplyRequest = (request: AssignedRequestItem) => {
    setSelectedRequest(request);
    setIsReplyModalOpen(true);
  };

  const handleMarkAsCompleted = () => {
    startTransition(async () => {
      try {
        await api.patch(`/requests/${selectedRequest!.id}/complete`);
        queryClient.invalidateQueries({
          queryKey: [MY_ASSIGNED_REQUESTS_QUERY_KEY],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
          exact: false,
        });
        toast.success("Solicitud marcada como completada");
        setSelectedRequest(null);
      } catch (error) {
        toast.error("Ocurrió un error al completar la solicitud");
      }
    });
  };

  const columns = getAssignedRequestColumns(
    handleViewRequest,
    handleReplyRequest,
    (request) => {
      setSelectedRequest(request);
      setIsCompleteModalOpen(true);
    }
  );

  return (
    <>
      <CompleteRequestDialog
        isLoading={isLoadingCompleted}
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        request={selectedRequest}
        onConfirm={handleMarkAsCompleted}
      />

      {selectedRequest && (
        <RequestDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          request={selectedRequest}
        />
      )}

      {isReplyModalOpen && selectedRequest && (
        <RequestReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          request={selectedRequest}
        />
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Gestión de solicitudes
          </h2>
          <p className="text-muted-foreground">
            Vista general del estado de todas las solicitudes en el sistema.
          </p>
        </div>

        {/* Vista tipo semáforo - Columnas por estado */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {!status && isLoadingCounts
            ? Array.from({ length: 4 }).map((_, i) => (
                <RequestsStatusCardSkeleton key={i} />
              ))
            : Object.entries(statusConfig).map(([estado, config]) => {
                const count = countsByStatus?.[estado as RequestStatus] ?? 0;
                const IconComponent = config.icon;

                return (
                  <RequestsStatusCard
                    key={estado}
                    status={estado}
                    Icon={IconComponent}
                    headerColor={config.headerColor}
                    count={count}
                    title={config.title}
                    bgColor={config.bgColor}
                  />
                );
              })}
        </div>

        {/* Tabla de solicitudes por estado seleccionado */}

        <Card>
          {!status ? (
            <AssignedRequestCardHeaderSkeleton />
          ) : (
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                {/* Renderiza el componente de icono aquí */}
                {statusConfig[status as keyof typeof statusConfig]?.icon &&
                  // Asigna el componente de icono a una variable local para renderizarlo
                  (() => {
                    const SelectedIcon =
                      statusConfig[status as keyof typeof statusConfig].icon;
                    return <SelectedIcon className="h-5 w-5" />;
                  })()}
                Solicitudes{" "}
                {statusConfig[status as keyof typeof statusConfig].title}
              </CardTitle>
              <CardDescription className="text-base">
                Lista detallada de solicitudes en estado{" "}
                {statusConfig[status as keyof typeof statusConfig].title}.
              </CardDescription>
            </CardHeader>
          )}
          <CardContent className="space-y-4">
            {isLoadingRequests && !requestData ? (
              <AssignedRequestTableSkeleton rowCount={8} />
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
                totalPages={Math.ceil(
                  (requestData?.total ?? 0) / filters.limit
                )}
                limit={filters.limit}
                onPageChange={(page) => updateFilters({ page })}
                onLimitChange={(limit) => updateFilters({ limit })}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
