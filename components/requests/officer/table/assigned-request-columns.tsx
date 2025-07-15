import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  Eye,
  Clock,
  Reply,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import { AssignedRequestItem } from "@/types/requests";
import { differenceInCalendarDays, isPast, isToday } from "date-fns";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHistoryStore } from "@/stores/history-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getAssignedRequestColumns(
  onView: (request: AssignedRequestItem) => void,
  onReply?: (request: AssignedRequestItem) => void,
  onComplete?: (request: AssignedRequestItem) => void,
  onTransfer?: (request: AssignedRequestItem) => void
): ColumnDef<AssignedRequestItem>[] {
  return [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div className="font-medium max-w-[300px] truncate">
          {row.original.subject}
        </div>
      ),
    },
    {
      accessorKey: "citizen.fullName",
      header: "Ciudadano",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.citizen.fullName}</div>
      ),
    },
    {
      accessorKey: "procedure.name",
      header: "Procedimiento",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.procedure.name}
        </div>
      ),
    },
    {
      accessorKey: "currentArea.name",
      header: "Área Actual",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.currentArea.name}</div>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Vence en",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          <Clock className="inline-block h-4 w-4 mr-1 text-muted-foreground" />
          {formatDate(row.original.deadline)}
        </div>
      ),
    },
    {
      id: "daysLeft",
      header: "Días restantes",
      cell: ({ row }) => {
        const { status, deadline } = row.original;
        const deadlineDate = new Date(deadline);
        const today = new Date();

        let colorClass = "";
        let text = "";

        if (status === "COMPLETED") {
          text = "Solicitud completada";
          colorClass = "bg-gray-100 text-gray-700";
        } else if (status === "OVERDUE") {
          text = "Plazo vencido";
          colorClass = "bg-red-100 text-red-700";
        } else if (status === "PENDING" || status === "IN_REVIEW") {
          if (isToday(deadlineDate)) {
            text = "Vence hoy";
            colorClass = "bg-orange-100 text-orange-700";
          } else if (isPast(deadlineDate)) {
            text = "Vencido";
            colorClass = "bg-red-100 text-red-700";
          } else {
            const daysLeft = differenceInCalendarDays(deadlineDate, today);
            text = `${daysLeft} días`;
            colorClass = "bg-green-100 text-green-700";
          }
        } else {
          // Por si aparece un estado desconocido
          return null;
        }

        return <Badge className={colorClass}>{text}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const { clearHistoryItem } = useHistoryStore();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(row.original)}>
                <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                Ver
              </DropdownMenuItem>

              {onReply &&
                row.original.status !== "IN_REVIEW" &&
                row.original.status !== "COMPLETED" && (
                  <DropdownMenuItem
                    onClick={() => onReply(row.original)}
                    className="text-emerald-600 focus:bg-emerald-100 focus:text-emerald-700"
                  >
                    <Reply className="h-4 w-4 mr-2 text-emerald-600" />
                    Contestar
                  </DropdownMenuItem>
                )}

              {onReply && (
                <DropdownMenuItem
                  asChild
                  className="text-blue-600 focus:bg-blue-100 focus:text-blue-700"
                >
                  <Link
                    href={`/solicitudes/historial/${row.original.id}`}
                    onClick={clearHistoryItem}
                  >
                    <Reply className="h-4 w-4 mr-2 text-blue-600" />
                    Ver historial
                  </Link>
                </DropdownMenuItem>
              )}

              {onComplete && row.original.status === "IN_REVIEW" && (
                <DropdownMenuItem
                  onClick={() => onComplete(row.original)}
                  className="text-green-600 focus:bg-green-100 focus:text-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Completar
                </DropdownMenuItem>
              )}

              {onTransfer && (
                <DropdownMenuItem
                  onClick={() => onTransfer(row.original)}
                  className={cn(
                    "text-gray-600 focus:bg-gray-100 focus:text-gray-800",
                    row.original.status === "COMPLETED" && "hidden"
                  )}
                >
                  <ArrowRightLeft className="h-4 w-4 mr-2 text-gray-600" />
                  Transferir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
