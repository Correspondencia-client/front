import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Procedure } from "@/types/procedure";
import { Badge } from "@/components/ui/badge";

export function getProcedureColumns(
  onEdit: (procedure: Procedure) => void,
  onDelete: (procedure: Procedure) => void,
  onView: (procedure: Procedure) => void
): ColumnDef<Procedure>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div className="">
          <p className="font-medium">{row.original.name}</p>
        </div>
      ),
    },
    {
      accessorKey: "maxResponseDays",
      header: "Días máx. de respuesta",
      cell: ({ row }) => (
        <div className="text-start font-medium">
          {row.original.maxResponseDays} días
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="h-4 w-4 mr-2 text-red-600" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
