import { ColumnDef } from "@tanstack/react-table";
import { ExternalRequest } from "@/types/requests";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Eye } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { es } from "date-fns/locale";

export function MyExternalRequestColumns(
  onView: (request: ExternalRequest) => void,
  onComplete: (request: ExternalRequest) => void
): ColumnDef<ExternalRequest>[] {
  return [
    {
      accessorKey: "radicado",
      header: "Radicado",
      cell: ({ row }) => (
        <div className="font-mono text-sm text-gray-800">
          {row.original.radicado}
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Asunto",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-900 max-w-[300px] truncate">
          {row.original.subject}
        </div>
      ),
    },
    {
      accessorKey: "recipientName",
      header: "Destinatario",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.recipient || "-"}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de creación",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <div className="text-sm text-gray-600">
            {format(date, "dd 'de' MMMM yyyy", { locale: es })}
          </div>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: "Días restantes",
      cell: ({ row }) => {
        const deadline = new Date(row.original.deadline);
        const today = new Date();
        const daysLeft = differenceInCalendarDays(deadline, today);

        return (
          <div className="text-sm text-gray-700 flex items-center gap-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            {daysLeft > 0
              ? `${daysLeft} día${daysLeft !== 1 ? "s" : ""}`
              : "Vencida"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acción",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(row.original)}
            className="text-sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onComplete(row.original)}
            className="text-sm"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Completar
          </Button>
        </div>
      ),
    },
  ];
}
