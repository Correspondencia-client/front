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

export function StatusPieChart() {
  const statusChartData = [
    {
      status: "Pendientes",
      value: 25,
      fill: "#9ca3af",
    },
    {
      status: "En Revisión",
      value: 20,
      fill: "#fcd34d",
    },
    {
      status: "Completadas",
      value: 43,
      fill: "#22c55e",
    },
    {
      status: "Vencidas",
      value: 10,
      fill: "#ef4444",
    },
  ];

  // Calcular el total de solicitudes para mostrar en el centro
  const total = useMemo(() => {
    return statusChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [statusChartData]);

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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Total: {total.toLocaleString()} solicitudes
        </div>
        <div className="text-muted-foreground">
          Distribución actual del estado de solicitudes
        </div>
      </CardFooter>
    </Card>
  );
}
