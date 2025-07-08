import { cn } from "@/lib/utils";
import { useEntitySelection } from "@/stores/entity-selection";
import { Inbox, Search } from "lucide-react";

interface EmptyEntityStateProps {
  searchTerm: string;
  className?: string;
}

export function EmptySidebarEntities({
  searchTerm,
  className,
}: EmptyEntityStateProps) {
  const { selectedEntityType } = useEntitySelection();

  return (
    <div className={cn("text-center text-muted-foreground py-4", className)}>
      {searchTerm ? (
        <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      ) : (
        <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
      )}
      {searchTerm
        ? `No se encontraron entidades con el criterio de busqueda "${searchTerm}"`
        : !searchTerm && !selectedEntityType
        ? "Selecciona un tipo de entidad"
        : "No hay entidades aún"}
    </div>
  );
}
