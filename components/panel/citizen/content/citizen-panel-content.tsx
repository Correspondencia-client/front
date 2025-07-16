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
import { useMyRequestsCount } from "@/hooks/use-requests";
import { useAuthStore } from "@/stores/auth-store";
import { RequestStatus } from "@/types/requests";
import {
  CalendarX,
  CheckCircle,
  FileText,
  Inbox,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

// Configuración del gráfico
const chartConfig = {
  value: {
    label: "Solicitudes",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function CitizenPanelContent() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("Bienvenido");
  const [loading, setLoading] = useState(false);

  const { data: countsByStatus, isLoading: isLoadingCounts } =
    useMyRequestsCount();

  // Datos del gráfico con colores específicos
  const statusChartData = [
    { status: "Pendientes", value: countsByStatus?.["PENDING" as RequestStatus], fill: "#9ca3af" },
    { status: "En Revisión", value: countsByStatus?.["IN_REVIEW" as RequestStatus], fill: "#fcd34d" },
    { status: "Completadas", value: countsByStatus?.["COMPLETED" as RequestStatus], fill: "#22c55e" },
    { status: "Vencidas", value: countsByStatus?.["OVERDUE" as RequestStatus], fill: "#ef4444" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-700">
          {greeting}, <span className="text-primary">{user?.fullName}</span>
        </h2>

        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/solicitudes/ciudadano/nueva-solicitud">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva solicitud
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta de Solicitudes Pendientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes Pendientes
            </CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{2}</div>
            <p className="text-xs text-muted-foreground">
              Solicitudes esperando acción
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Solicitudes Completadas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes Completadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{4}</div>
            <p className="text-xs text-muted-foreground">
              Solicitudes finalizadas con éxito
            </p>
          </CardContent>
        </Card>

        {/* Tarjeta de Solicitudes Vencidas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes Vencidas
            </CardTitle>
            <CalendarX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{1}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención urgente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfica de Estado de Solicitudes */}
      <div className="grid grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estado General de Solicitudes</CardTitle>
            <CardDescription>
              Distribución de solicitudes por su estado actual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingCounts ? (
              <div className="flex items-center justify-center">
                Cargando gráfica...
              </div>
            ) : (
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={statusChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="value" radius={8}>
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
