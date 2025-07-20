"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useKpis } from "@/hooks/use-analytics";
import { Clock, CircleCheckBig, FileText, Users } from "lucide-react";
import { KPICardsSkeleton } from "../skeletons/kpi-cards-skeleton";

export function KPICards() {
  const { data, isLoading } = useKpis();

  if (isLoading) return <KPICardsSkeleton />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Solicitudes
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalRequests}</div>
          {/* <p className="text-xs text-muted-foreground">+120 este mes</p> */}
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Solicitudes Resueltas
          </CardTitle>
          <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.resolvedRequests}</div>
          {/* <p className="text-xs text-muted-foreground">Tasa de resolución del 80%</p> */}
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Tiempo Promedio Respuesta
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.avgResponseTime}</div>
          {/* <p className="text-xs text-muted-foreground">-10% que el mes pasado</p> */}
        </CardContent>
      </Card>
      <Card className="border">
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Usuarios Activos
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.activeUsers}</div>
          {/* <p className="text-xs text-muted-foreground">+5 nuevos esta semana</p> */}
        </CardContent>
      </Card>
    </div>
  );
}
