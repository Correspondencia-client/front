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

export const userColumns: ColumnDef<User>[] = [
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
            role === "SUPERVISOR" && "bg-blue-100 text-blue-800",
            role === "MODERATOR" && "bg-orange-100 text-orange-800",
            role === "USER" && "bg-gray-100 text-gray-800"
          )}
        >
          {role}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "area.name",
  //   header: "Área",
  //   cell: ({ row }) => (
  //     <div className="text-sm">{row.original.area?.name || "Sin área"}</div>
  //   ),
  // },
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
  // {
  //   accessorKey: "createdAt",
  //   header: "Fecha",
  //   cell: ({ row }) => (
  //     <div className="text-sm text-gray-600">
  //       {new Date(row.original.createdAt).toLocaleDateString()}
  //     </div>
  //   ),
  // },
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
          <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => console.log("Eliminar", row.original)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
