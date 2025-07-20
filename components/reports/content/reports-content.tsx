"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadUnifiedExcelReport } from "@/utils/reports";
import { Filter } from "lucide-react";
import { useState, startTransition } from "react";
import { toast } from "sonner";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "IN_REVIEW":
      return "default";
    case "COMPLETED":
      return "default";
    case "OVERDUE":
      return "destructive";
    default:
      return "outline";
  }
};

export function ReportsContent() {
  const [filters, setFilters] = useState({
    radicado: "",
    subject: "",
    status: "all" as "PENDING" | "IN_REVIEW" | "COMPLETED" | "OVERDUE" | "all",
    type: "all" as "internal" | "external" | "all",
    startDate: "",
    endDate: "",
  });

  const handleDownloadExcel = () => {
    startTransition(async () => {
      try {
        const params = {
          radicado: filters.radicado || undefined,
          subject: filters.subject || undefined,
          status: filters.status === "all" ? undefined : filters.status,
          type: filters.type === "all" ? undefined : filters.type,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        };

        const blob = await downloadUnifiedExcelReport(params);

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "reporte-solicitudes.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        toast.success("Reporte descargado correctamente");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Error al generar el reporte"
        );
      }
    });
  };

  const start = filters.startDate ? new Date(filters.startDate) : null;
  const end = filters.endDate ? new Date(filters.endDate) : null;

  const invalidDateRange =
    (start && !end) ||
    (!start && end) ||
    (start && end && start.getTime() > end.getTime());

  return (
    <>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Reportes de solicitudes
        </h1>
        <p className="text-muted-foreground">
          Genera y descarga reportes personalizados de solicitudes con filtros
          avanzados.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <CardTitle className="text-lg">Filtros</CardTitle>
            </div>

            <Button
              onClick={handleDownloadExcel}
              className="w-full md:w-auto"
              disabled={Boolean(invalidDateRange)}
            >
              Descargar Reporte en Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={filters.status}
                onValueChange={(value: any) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="PENDING">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusBadgeVariant("PENDING")}
                        className="h-4 w-4 rounded-full p-0"
                      />
                      Pendiente
                    </div>
                  </SelectItem>
                  <SelectItem value="IN_REVIEW">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusBadgeVariant("IN_REVIEW")}
                        className="h-4 w-4 rounded-full p-0"
                      />
                      En revisión
                    </div>
                  </SelectItem>
                  <SelectItem value="COMPLETED">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusBadgeVariant("COMPLETED")}
                        className="h-4 w-4 rounded-full p-0"
                      />
                      Completada
                    </div>
                  </SelectItem>
                  <SelectItem value="OVERDUE">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getStatusBadgeVariant("OVERDUE")}
                        className="h-4 w-4 rounded-full p-0"
                      />
                      Vencida
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Solicitud</Label>
              <Select
                value={filters.type}
                onValueChange={(value: any) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="internal">📋 Solicitud Interna</SelectItem>
                  <SelectItem value="external">🌐 Solicitud Externa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha Inicio</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha Fin</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {invalidDateRange && (
        <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3 mt-4">
          {!start || !end
            ? "Debes seleccionar ambas fechas para filtrar por rango."
            : "La fecha de inicio no puede ser posterior a la fecha de fin."}
        </div>
      )}

      {!invalidDateRange && !start && !end && (
        <div className="text-sm text-blue-600 border border-blue-200 bg-blue-50 rounded-md p-3 mt-4">
          Si no seleccionas un rango de fechas, el reporte incluirá solo los
          datos del mes actual.
        </div>
      )}
    </>
  );
}
