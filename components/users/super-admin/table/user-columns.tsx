import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Mail, MailCheck, MoreHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";

export function getUserColumns(
  onEdit: (user: User) => void,
  onDelete: (user: User) => void
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "fullName",
      header: "Usuario",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.fullName}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge
            variant={role === "ADMIN" ? "default" : "secondary"}
            className={cn(
              role === "ADMIN" && "bg-purple-100 text-purple-800",
              role === "CITIZEN" && "bg-blue-100 text-blue-800",
              role === "OFFICER" && "bg-orange-100 text-orange-800"
            )}
          >
            {role === "ADMIN"
              ? "Administrador"
              : role === "CITIZEN"
              ? "Ciudadano"
              : role === "OFFICER" && "Funcionario"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "area.name",
      header: "Área",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.area?.name || "Sin área"}</div>
      ),
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) => {
        const active = row.original.active;
        return (
          <Badge
            variant={active ? "default" : "secondary"}
            className={cn(
              active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}
          >
            {active ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isEmailVerified",
      header: "Verificación",
      cell: ({ row }) => {
        const verified = row.original.isEmailVerified;
        return (
          <div className="flex items-center gap-1">
            {verified ? (
              <MailCheck className="h-4 w-4 text-green-600" />
            ) : (
              <Mail className="h-4 w-4 text-gray-400" />
            )}
            <span className="text-sm">
              {verified ? "Verificado" : "Pendiente"}
            </span>
          </div>
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
