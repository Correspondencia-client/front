"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AssignedRequestItem } from "@/types/requests";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, Eye } from "lucide-react";

interface CitizenHistoryCardItemProps {
  request: AssignedRequestItem;
}

export function CitizenHistoryCardItem({
  request,
}: CitizenHistoryCardItemProps) {
  return (
    <Card
      key={request.id}
      className="hover:shadow-md transition-shadow shadow-none duration-200 border py-0 bg-muted/80"
    >
      {/* Sombra y borde mejorados */}
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl text-foreground uppercase">
                {request.subject}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* <FileText className="h-4 w-4 text-primary" /> */}
              <span className="font-medium">Tipo de Procedimiento:</span>{" "}
              <span className="text-primary">{request.procedure.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link href={`/solicitudes/historial/${request.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Ver historial
              </Link>
            </Button>
          </div>
        </div>

        {/* Detalles con iconos y mejor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm text-muted-foreground mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha:</span>{" "}
            {new Date(request.createdAt).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha Límite:</span>{" "}
            {new Date(request.deadline).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
