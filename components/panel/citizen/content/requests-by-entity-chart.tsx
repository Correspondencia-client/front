"use client";
import * as React from "react";
import { Building2, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

// Tipos para los datos
interface RequestsByEntity {
  entityName: string;
  count: number;
  fill: string;
}

interface RequestsByEntityChartProps {
  data?: RequestsByEntity[];
  isLoading?: boolean;
  totalRequests?: number;
}

// Configuración del gráfico
const chartConfig = {
  count: {
    label: "Solicitudes",
  },
  entity1: {
    label: "Alcaldía",
    color: "var(--chart-1)",
  },
  entity2: {
    label: "Gobernación",
    color: "var(--chart-2)",
  },
  entity3: {
    label: "Secretaría de Salud",
    color: "var(--chart-3)",
  },
  entity4: {
    label: "Secretaría de Educación",
    color: "var(--chart-4)",
  },
  entity5: {
    label: "Otras Entidades",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

// Componente skeleton para el gráfico de torta
export function PieChartSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
          <div className="relative">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardFooter>
    </Card>
  );
}

// Componente principal del gráfico
export function RequestsByEntityChart({
  data = [],
  isLoading = false,
  totalRequests = 0,
}: RequestsByEntityChartProps) {
  const chartData = React.useMemo(() => {
    return data.map((item, index) => ({
      entityName: item.entityName,
      count: item.count,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));
  }, [data]);

  const totalRequestsCalculated = React.useMemo(() => {
    return (
      totalRequests || chartData.reduce((acc, curr) => acc + curr.count, 0)
    );
  }, [chartData, totalRequests]);

  if (isLoading) {
    return <PieChartSkeleton />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Solicitudes por Entidad
        </CardTitle>
        <CardDescription>
          Distribución de solicitudes realizadas por entidad
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="entityName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRequestsCalculated.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Solicitudes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {chartData.length > 0 && (
            <>
              {chartData[0].entityName} es la entidad con más solicitudes
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          Total de solicitudes realizadas hasta la fecha
        </div>
      </CardFooter>
    </Card>
  );
}
