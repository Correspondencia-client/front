"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useMyAssignedRequestsCountByStatus,
  useMyRequests,
  useMyRequestsCount,
} from "@/hooks/use-requests";
import { useAuthStore } from "@/stores/auth-store";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import { RecentRequestsSkeleton } from "../skeletons/recent-requests-skeleton";
import { SimpleChartSkeleton } from "../skeletons/simple-chart-skeleton";
import { RecentRequestsItem } from "./recent-requests-item";

// Configuración del gráfico
const chartConfig = {
  value: {
    label: "Solicitudes",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function CitizenPanelContent() {
  const { user } = useAuthStore();

  // Hook condicional para CITIZEN - solo se ejecuta si el usuario es CITIZEN
  const { data: countsByStatus, isLoading: isLoadingCounts } =
    useMyRequestsCount({
      enabled: user?.role === "CITIZEN",
    });

  // Hook condicional para OFFICER - solo se ejecuta si el usuario es OFFICER
  const { data: officerCountsByStatus, isLoading: isLoadingOfficerCounts } =
    useMyAssignedRequestsCountByStatus({
      enabled: user?.role === "OFFICER",
    });

  const { data: requestData, isLoading: isLoadingRequests } = useMyRequests({
    status: "PENDING",
    page: 1,
    limit: 5,
  });

  // Datos del gráfico con colores específicos
  const counts =
    user?.role === "CITIZEN" ? countsByStatus : officerCountsByStatus;

  const statusChartData = [
    {
      status: "Pendientes",
      value: counts?.["PENDING"] ?? 0,
      fill: "#9ca3af",
    },
    {
      status: "En Revisión",
      value: counts?.["IN_REVIEW"] ?? 0,
      fill: "#fcd34d",
    },
    {
      status: "Completadas",
      value: counts?.["COMPLETED"] ?? 0,
      fill: "#22c55e",
    },
    {
      status: "Vencidas",
      value: counts?.["OVERDUE"] ?? 0,
      fill: "#ef4444",
    },
  ];

  const isEmptyChart = statusChartData.every((item) => item.value === 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-700">
            Bienvenido,{" "}
            <span className="text-muted-foreground">{user?.fullName}</span>
          </h2>
          <p className="text-muted-foreground">
            Este es el portal ciudadano con acceso directo para crear nuevas
            solicitudes de manera rápida y sencilla.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button asChild className="max-md:w-full">
            <Link href="/solicitudes/ciudadano/nueva-solicitud">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva solicitud
            </Link>
          </Button>
        </div>
      </div>

      {/* Gráfica de Estado de Solicitudes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {isLoadingCounts || isLoadingOfficerCounts ? (
          <SimpleChartSkeleton />
        ) : isEmptyChart ? (
          <Card className="border border-dashed border-primary bg-primary/5">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-lg text-muted-foreground">
                Sin datos por mostrar
              </CardTitle>
              <CardDescription>
                Aún no se han registrado solicitudes en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Crea nuevas solicitudes para ver resultados en esta sección.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-dashed border-primary bg-primary/10">
            <CardHeader>
              <CardTitle>Estado general de tus solicitudes</CardTitle>
              <CardDescription>
                Distribución de solicitudes por su estado actual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  className="bg-white p-4 rounded-lg"
                  accessibilityLayer
                  data={statusChartData}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className="text-primary"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="value" radius={10}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* <RequestsByEntityChart data={requestsByEntity} isLoading={false} /> */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Recientes</CardTitle>
            <CardDescription>
              Últimas solicitudes registradas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-2">
              {isLoadingCounts || isLoadingRequests ? (
                <RecentRequestsSkeleton />
              ) : requestData?.requests.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No hay solicitudes recientes registradas.
                </p>
              ) : (
                requestData?.requests.map((request) => (
                  <RecentRequestsItem key={request.id} request={request} />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
