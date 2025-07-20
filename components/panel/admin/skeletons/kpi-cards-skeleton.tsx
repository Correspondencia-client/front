"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  CircleCheckBig,
  Clock,
  Users,
} from "lucide-react";

export function KPICardsSkeleton() {
  const icons = [
    <FileText key="file" className="h-4 w-4 text-muted-foreground" />,
    <CircleCheckBig key="check" className="h-4 w-4 text-muted-foreground" />,
    <Clock key="clock" className="h-4 w-4 text-muted-foreground" />,
    <Users key="users" className="h-4 w-4 text-muted-foreground" />,
  ];

  const titles = [
    "Total de Solicitudes",
    "Solicitudes Resueltas",
    "Tiempo Promedio Respuesta",
    "Usuarios Activos",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {titles.map((title, i) => (
        <Card key={title} className="border">
          <CardHeader className="flex justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icons[i]}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-16 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
