"use client";

import { useMyRequests, useMyRequestsCount } from "@/hooks/use-requests";
import React, { useState } from "react";
import { RequestsStatusCardSkeleton } from "../../officer/skeleton/request-status-card-skeleton";
import { statusConfig } from "@/constants/requests";
import { RequestStatus } from "@/types/requests";
import { RequestsStatusCard } from "../../officer/content/requests-status-card";
import { useRequestStatusStore } from "@/stores/request-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AssignedRequestCardHeaderSkeleton } from "../../officer/skeleton/assigned-request-card-header-skeleton";
import { CitizenHistoryCardItem } from "./citizen-history-card-item";
import { CitizenHistoryCardItemSkeleton } from "../skeletons/citizen-history-card-item-skeleton";
import { Paginator } from "@/components/common/paginator";

interface MyRequestFilters {
  search: string;
  page: number;
  limit: number;
}

export function CitizenHistoryContent() {
  const { status } = useRequestStatusStore();

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
    useMyRequestsCount();

  const { data: requestData, isLoading: isLoadingRequests } = useMyRequests({
    status: status || "PENDING",
    page: filters.page,
    limit: filters.limit,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Mis solicitudes</h2>
        <p className="text-muted-foreground">
          Da seguimiento a todas tus solicitudes.
        </p>
      </div>

      {/* Estados de las solicitudes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingCounts
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
          {isLoadingRequests ? (
            // Estado de carga
            Array.from({ length: 5 }).map((_, i) => (
              <CitizenHistoryCardItemSkeleton key={i} />
            ))
          ) : requestData && requestData.requests.length > 0 ? (
            // Datos cargados con resultados
            requestData.requests.map((request) => (
              <CitizenHistoryCardItem key={request.id} request={request} />
            ))
          ) : (
            // Datos cargados pero sin resultados
            <div className="text-muted-foreground text-center py-6">
              Sin resultados.
            </div>
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
