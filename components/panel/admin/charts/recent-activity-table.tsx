"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentActivity } from "@/hooks/use-analytics";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ListOrdered } from "lucide-react";

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "PENDING":
      return (
        <Badge variant="secondary" className="bg-gray-200 text-gray-800">
          Pendiente
        </Badge>
      );
    case "IN_REVIEW":
      return (
        <Badge variant="default" className="bg-yellow-100 text-yellow-800">
          En Revisión
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Completada
        </Badge>
      );
    case "OVERDUE":
      return (
        <Badge variant="default" className="bg-red-100 text-red-800">
          Vencida
        </Badge>
      );
    default:
      return <Badge variant="outline">{estado}</Badge>;
  }
};

// Formato para "Vence el"
const formatVenceEl = (dateStr: string) =>
  format(new Date(dateStr), "MMMM dd, yyyy", { locale: es });

// Formato para "Fecha de creación" (con hora 12h)
const formatCreado = (dateStr: string) =>
  format(new Date(dateStr), "MMMM dd, yyyy - hh:mm a", { locale: es })
    .replace("AM", "a. m.")
    .replace("PM", "p. m.");

export function RecentActivityTable() {
  const { data, isLoading, isError } = useRecentActivity();

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
                <TableHead>Radicado</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Vence el</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Creación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !data || data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hay solicitudes recientes registradas.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-medium">
                      {solicitud.radicado}
                    </TableCell>
                    <TableCell>{solicitud.subject}</TableCell>
                    <TableCell>{formatVenceEl(solicitud.deadline)}</TableCell>
                    <TableCell>{getEstadoBadge(solicitud.status)}</TableCell>
                    <TableCell>{formatCreado(solicitud.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
