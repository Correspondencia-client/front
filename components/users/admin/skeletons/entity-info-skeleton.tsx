import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EntityInfoSkeletonProps {
  className?: string;
}

export function EntityInfoSkeleton({ className }: EntityInfoSkeletonProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex flex-row md:flex-col md:items-start gap-4">
          {/* Imagen skeleton */}
          <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />

          <div className="flex-1 min-w-0 space-y-2">
            {/* Título y badge skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Tipo skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Descripción skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <div className="grid gap-3">
          {/* Teléfono skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Fecha skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* Áreas skeleton */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-wrap gap-1 ml-6">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-18 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
