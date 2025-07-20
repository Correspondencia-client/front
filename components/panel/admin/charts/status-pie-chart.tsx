// components/officer-panel/StatusPieChart.tsx
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PieChartIcon } from "lucide-react";
import { useMemo } from "react";
import { useStatusPieChartData } from "@/hooks/use-analytics";
import { StatusPieChartSkeleton } from "../skeletons/status-pie-chart-skeleton";

const pieChartConfig = {
  value: {
    label: "Solicitudes",
  },
  Pendientes: {
    label: "Pendientes",
    color: "#9ca3af", // gris
  },
  "En Revisión": {
    label: "En Revisión",
    color: "#fcd34d", // amarillo
  },
  Completadas: {
    label: "Completadas",
    color: "#22c55e", // verde
  },
  Vencidas: {
    label: "Vencidas",
    color: "#ef4444", // rojo
  },
} satisfies ChartConfig;

const STATUS_COLORS: Record<string, string> = {
  Pendientes: "#9ca3af", // gris
  "En Revisión": "#fcd34d", // amarillo
  Completadas: "#22c55e", // verde
  Vencidas: "#ef4444", // rojo
};

export function StatusPieChart() {
  const { data, isLoading, isError } = useStatusPieChartData();

  const statusChartData = useMemo(() => {
    return (data ?? []).map((item) => ({
      ...item,
      fill: STATUS_COLORS[item.status] ?? "#9ca3af", // fallback gris
    }));
  }, [data]);

  const total = useMemo(() => {
    return statusChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [statusChartData]);

  if (isLoading) {
    return <StatusPieChartSkeleton />;
  }

  const showNoData = total === 0;

  return (
    <Card className="lg:col-span-1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Distribución por Estado
        </CardTitle>
        <CardDescription>
          Cantidad de solicitudes por su estado actual.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 overflow-visible">
        <ChartContainer config={pieChartConfig} className="mx-auto size-full">
          {showNoData ? (
            <div className="flex flex-col items-center justify-center size-full text-muted-foreground bg-blue-50 border border-dashed border-primary rounded-md p-4">
              <PieChartIcon className="h-14 w-14 mb-4 opacity-30" />
              <div className="text-lg font-semibold">
                No hay datos suficientes
              </div>
              <div className="text-sm text-center">
                Aún no hay solicitudes registradas para mostrar el gráfico.
              </div>
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="status"
                label
              />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>

      {showNoData ? null : (
        <CardFooter className="flex-col gap-2 text-sm bg-muted border border-dashed mx-4 p-2 rounded-md">
          <div className="flex items-center gap-2 font-medium">
            Total: {total.toLocaleString()} solicitudes
          </div>
          <div className="text-muted-foreground">
            Distribución actual del estado de solicitudes
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
