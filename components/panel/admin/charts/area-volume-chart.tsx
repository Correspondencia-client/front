import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartIcon } from "lucide-react";
import { chartConfig } from "@/components/panel/admin/officer-panel-content";
import { useAreaVolumeData } from "@/hooks/use-analytics";
import { AreaVolumeChartSkeleton } from "../skeletons/area-volume-chart-skeleton";

// Paleta de colores azules para usar dinámicamente
const blueColorPalette = [
  "#1e40af", // blue-800
  "#2563eb", // blue-600
  "#3b82f6", // blue-500
  "#60a5fa", // blue-400
  "#93c5fd", // blue-300
  "#bfdbfe", // blue-200
  "#dbeafe", // blue-100
  "#eff6ff", // blue-50
];

// Función para asignar colores dinámicamente
const assignColorsToData = (data: any[]) => {
  return data.map((item, index) => ({
    ...item,
    fill: blueColorPalette[index % blueColorPalette.length],
  }));
};

// Simulación de datos que vendrían de una API
const rawApiData = [
  { name: "Secretaría de Gobierno", requests: 320 },
  { name: "Planeación", requests: 280 },
  { name: "Hacienda", requests: 190 },
  { name: "Obras Públicas", requests: 150 },
  { name: "Educación", requests: 100 },
  { name: "Salud", requests: 80 },
];

export function AreaVolumeChart() {
  // const areaVolumeData = assignColorsToData(rawApiData);

  const { data, isLoading, isError } = useAreaVolumeData();

  if (isLoading) {
    return <AreaVolumeChartSkeleton />;
  }

  const areaVolumeData = assignColorsToData(data ?? []);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChartIcon className="h-5 w-5 text-primary" />
          Volumen de Solicitudes por Área
        </CardTitle>
        <CardDescription>
          Número de solicitudes gestionadas por cada área.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={areaVolumeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="requests" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
