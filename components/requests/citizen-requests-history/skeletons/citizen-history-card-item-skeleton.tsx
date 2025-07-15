"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CitizenHistoryCardItemSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow shadow-none duration-200 border py-0 bg-muted/80">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Tipo de Procedimiento:</span>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" disabled>
              <Eye className="mr-2 h-4 w-4" />
              <span className="text-sm">Ver historial</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm text-muted-foreground mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha:</span>
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha Límite:</span>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
