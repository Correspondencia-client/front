import { ColumnDef } from "@tanstack/react-table";
import { AssignedRequestItem } from "@/types/requests";
import { Button } from "@/components/ui/button";
import { Eye, Clock } from "lucide-react";
import { formatDistanceToNowStrict, format } from "date-fns";
import { es } from "date-fns/locale";

export function MyExternalRequestColumns(
  onView: (request: AssignedRequestItem) => void
): ColumnDef<AssignedRequestItem>[] {
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
          {row.original.currentArea?.name || "Área no disponible"}
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
    // {
    //   accessorKey: "deadline",
    //   header: "Días para responder",
    //   cell: ({ row }) => {
    //     const deadline = new Date(row.original.deadline);
    //     const now = new Date();

    //     const diffText = formatDistanceToNowStrict(deadline, {
    //       locale: es,
    //       addSuffix: false,
    //     });

    //     return (
    //       <div className="text-sm text-gray-600 flex items-center gap-1">
    //         <Clock className="w-4 h-4 text-muted-foreground" />
    //         {diffText}
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      header: "Acción",
      cell: ({ row }) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onView(row.original)}
          className="text-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver solicitud
        </Button>
      ),
    },
  ];
}
