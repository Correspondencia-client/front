import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UsersTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Título skeleton */}
          <Skeleton className="h-7 w-48" />

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Barra de búsqueda skeleton */}
            <div className="relative">
              <Skeleton className="h-10 w-full sm:w-64" />
            </div>
            {/* Botón agregar skeleton */}
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-8" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-10" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-14" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Generar 8 filas skeleton */}
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow key={index}>
                  {/* Usuario */}
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  {/* Email */}
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  {/* Rol */}
                  <TableCell>
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </TableCell>
                  {/* Área */}
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  {/* Estado */}
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  {/* Verificación */}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </TableCell>
                  {/* Acciones */}
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginación skeleton */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <Skeleton className="h-4 w-40" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
