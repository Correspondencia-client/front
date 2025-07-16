import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SimpleChartSkeleton() {
  return (
    <Card className="border border-dashed border-primary bg-primary/10">
      <CardHeader>
        <CardTitle>Estado general de tus solicitudes</CardTitle>
        <CardDescription>
          Distribución de solicitudes por su estado actual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Área principal del gráfico */}
          <div className="h-[300px] w-full relative bg-white p-4 rounded-lg">
            {/* Skeleton para las barras */}
            <div className="absolute bottom-6 left-0 right-0 flex items-end justify-around px-4">
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-12 w-16 rounded-t-lg" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-20 w-16 rounded-t-lg" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-28 w-16 rounded-t-lg" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-16 rounded-t-lg" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Líneas del grid */}
            <div className="absolute inset-0 flex flex-col justify-between py-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-px w-full" />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
