import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Eye, Clock, Reply, CheckCircle } from "lucide-react";
import { AssignedRequestItem } from "@/types/requests";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(row.original)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>

          {onReply && (
            <>
              <Button
                variant="default"
                size="sm"
                className={cn(
                  (row.original.status === "IN_REVIEW" ||
                    row.original.status === "COMPLETED") &&
                    "hidden"
                )}
                onClick={() => onReply(row.original)}
              >
                <Reply className="h-4 w-4 mr-1" />
                Contestar
              </Button>
              <Link
                href={`/solicitudes/historial/${row.original.id}`}
                className={cn(
                  "hidden bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
                  row.original.status === "IN_REVIEW" && "inline-flex"
                )}
              >
                <Reply className="h-4 w-4 mr-1" />
                Historial
              </Link>
            </>
          )}

          {onComplete && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-green-700 hover:text-green-900",
                row.original.status !== "IN_REVIEW" && "hidden"
              )}
              onClick={() => onComplete(row.original)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Completar
            </Button>
          )}

          {onTransfer && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTransfer(row.original)}
            >
              <ArrowRightLeft className="h-4 w-4 mr-1" />
              Transferir
            </Button>
          )}
        </div>
      ),
    },
  ];
}
