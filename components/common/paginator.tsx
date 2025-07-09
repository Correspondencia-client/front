import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function Paginator({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
      {/* Info de página y paginador juntos en móviles */}
      <div className="flex items-center justify-between gap-2 w-full">
        {/* Información de página */}
        <p className="text-muted-foreground text-sm whitespace-nowrap">
          Página <span className="text-foreground">{currentPage}</span> de{" "}
          <span className="text-foreground">{totalPages}</span>
        </p>

        {/* Paginador */}
        <Pagination className="max-sm:justify-end">
          <PaginationContent className="flex-wrap">
            {/* Botón anterior */}
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className={cn(
                  "select-none",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              >
                <ChevronLeftIcon size={16} />
              </PaginationLink>
            </PaginationItem>

            {/* Ellipsis izquierda */}
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Números de página */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={page === currentPage}
                  className="select-none"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis derecha */}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Botón siguiente */}
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={cn(
                  "select-none",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              >
                <ChevronRightIcon size={16} />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Select: resultados por página, centrado abajo en móviles */}
      <div className="flex justify-center sm:justify-end w-full sm:w-auto">
        <Select
          value={limit.toString()}
          onValueChange={(val) => onLimitChange(Number(val))}
        >
          <SelectTrigger
            id="results-per-page"
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 / página</SelectItem>
            <SelectItem value="20">20 / página</SelectItem>
            <SelectItem value="50">50 / página</SelectItem>
            <SelectItem value="100">100 / página</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
