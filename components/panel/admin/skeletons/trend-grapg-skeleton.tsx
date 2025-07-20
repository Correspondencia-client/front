import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChartIcon } from "lucide-react";

export function TrendGrapgSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-primary" />
          Tendencia de Solicitudes (Últimos 30 días)
        </CardTitle>
        <CardDescription>
          Número de solicitudes creadas por día.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full h-[350px]">
          <Skeleton className="w-full h-[350px] rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
