import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChartIcon } from "lucide-react";

export function AreaVolumeChartSkeleton() {
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
        <div className="w-full h-56 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
