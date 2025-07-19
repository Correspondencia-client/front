"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subDays } from "date-fns";
import { ListOrdered } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const recentActivityData = [
  {
    id: "SOL-001",
    asunto: "Solicitud de Información Pública",
    area: "Secretaría de Gobierno",
    estado: "Nuevo",
    fecha: "2024-07-17",
  },
  {
    id: "SOL-002",
    asunto: "Petición de Documentos",
    area: "Planeación",
    estado: "En Proceso",
    fecha: "2024-07-16",
  },
  {
    id: "SOL-003",
    asunto: "Queja por Servicio",
    area: "Obras Públicas",
    estado: "Resuelto",
    fecha: "2024-07-15",
  },
  {
    id: "SOL-004",
    asunto: "Solicitud de Reunión",
    area: "Hacienda",
    estado: "Rechazado",
    fecha: "2024-07-14",
  },
  {
    id: "SOL-005",
    asunto: "Consulta de Normativa",
    area: "Educación",
    estado: "En Proceso",
    fecha: "2024-07-13",
  },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Nuevo":
      return <Badge variant="secondary">Nuevo</Badge>;
    case "En Proceso":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          En Proceso
        </Badge>
      );
    case "Resuelto":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Resuelto
        </Badge>
      );
    case "Rechazado":
      return (
        <Badge variant="default" className="bg-red-100 text-red-800">
          Rechazado
        </Badge>
      );
    default:
      return <Badge variant="outline">{estado}</Badge>;
  }
};

export function RecentActivityTable() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const filteredRecentActivityData = useMemo(
    () => recentActivityData,
    [dateRange]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-primary" />
          Actividad Reciente
        </CardTitle>
        <CardDescription>
          Las 5 solicitudes más recientes en la plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Solicitud</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Área Asignada</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Creación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecentActivityData.length > 0 ? (
                filteredRecentActivityData.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-medium">
                      {solicitud.id}
                    </TableCell>
                    <TableCell>{solicitud.asunto}</TableCell>
                    <TableCell>{solicitud.area}</TableCell>
                    <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                    <TableCell>{solicitud.fecha}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay actividad reciente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
