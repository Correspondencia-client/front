"use client";

import { ChartConfig } from "@/components/ui/chart";
import { useAuthStore } from "@/stores/auth-store";
import { KPICards } from "./charts/kpi-cards";
import { AreaVolumeChart } from "./charts/area-volume-chart";
import { StatusPieChart } from "./charts/status-pie-chart";
import { TrendGraph } from "./charts/trend-graph";
import { RecentActivityTable } from "./charts/recent-activity-table";

export const chartConfig = {
  solicitudes: {
    label: "Solicitudes",
  },
} satisfies ChartConfig;

export function OfficerPanelContent() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
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

      <KPICards />

      {/* Gráficos Principales */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AreaVolumeChart />

        <StatusPieChart />
      </div>

      <TrendGraph />
      <RecentActivityTable />
    </div>
  );
}
