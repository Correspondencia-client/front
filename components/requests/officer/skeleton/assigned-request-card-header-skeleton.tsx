"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader } from "@/components/ui/card";

export function AssignedRequestCardHeaderSkeleton() {
  return (
    <CardHeader className="space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-4 w-80" />
    </CardHeader>
  );
}
