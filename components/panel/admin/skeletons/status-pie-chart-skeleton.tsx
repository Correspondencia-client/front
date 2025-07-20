import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PieChartIcon } from "lucide-react";

export function StatusPieChartSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Distribución por Estado
        </CardTitle>
        <CardDescription>
          Cantidad de solicitudes por su estado actual.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 h-fit">
        <div className="flex items-center justify-center w-full h-56">
          <Skeleton className="w-56 h-56 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
