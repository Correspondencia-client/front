import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import { Entity } from "@/types/entity";

export function getEntityColumns(
  onEdit: (entity: Entity) => void,
  onView: (entity: Entity) => void
): ColumnDef<Entity>[] {
  return [
    {
      accessorKey: "name",
      header: "Entidad",
      cell: ({ row }) => {
        const entity = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={entity.imgUrl}
              alt={`Logo de ${entity.name}`}
              className="w-10 h-10 rounded-md object-cover border"
            />
            <div>
              <div className="font-medium">{entity.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge className="bg-blue-100 text-blue-800">{row.original.type}</Badge>
      ),
    },
    {
      accessorKey: "phone",
      header: "Contacto",
      cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
    },
    {
      accessorKey: "areas",
      header: "Áreas",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.areas.length}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creación",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return (
          <span className="text-sm text-muted-foreground">
            {date.toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
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
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
