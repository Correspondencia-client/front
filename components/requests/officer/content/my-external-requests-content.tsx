"use client";

import { useMyRequests } from "@/hooks/use-requests";
import React, { useState } from "react";
import { AssignedRequestItem } from "@/types/requests";
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

interface MyRequestFilters {
  search: string;
  page: number;
  limit: number;
}

export function MyExternalRequestsContent() {
  const { status } = useRequestStatusStore();

  // Estado para el modal de detalle de solicitud
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Estado para la solicitud seleccionada
  const [selectedRequest, setSelectedRequest] =
    useState<AssignedRequestItem | null>(null);

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

  const { data: requestData, isLoading: isLoadingRequests } = useMyRequests({
    status: status || "PENDING",
    page: filters.page,
    limit: filters.limit,
  });

  const handleViewRequest = (request: AssignedRequestItem) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const columns = MyExternalRequestColumns(handleViewRequest);

  return (
    <div className="space-y-6">
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
            <div className="flex-1 min-w-64">
              <div className="relative max-w-xl">
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
