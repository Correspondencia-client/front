"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export function AnimatedPaginator({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 7,
  className,
}: AnimatedPaginatorProps) {
  // if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = maxVisiblePages;
    } else if (currentPage + half >= totalPages) {
      start = totalPages - maxVisiblePages + 1;
    }

    const pages: (number | string)[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  const pageButton = (page: number | string, isActive = false) => {
    return (
      <Button
        key={page}
        size="sm"
        variant={isActive ? "default" : "outline"}
        className="transition-all duration-200"
        onClick={() => typeof page === "number" && onPageChange(page)}
        disabled={typeof page !== "number"}
      >
        {typeof page === "string" ? (
          <MoreHorizontal className="w-4 h-4" />
        ) : (
          page
        )}
      </Button>
    );
  };

  return (
    <nav className={cn("flex items-center justify-between w-full", className)}>
      <div className="flex gap-1 items-center">
        {showFirstLast && currentPage > 1 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(1)}
            className="text-sm text-muted-foreground mr-2 hover:text-foreground"
          >
            Primera
          </motion.button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((page) =>
          pageButton(page, typeof page === "number" && page === currentPage)
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {showFirstLast && currentPage < totalPages && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(totalPages)}
            className="text-sm text-muted-foreground ml-2 hover:text-foreground"
          >
            Última
          </motion.button>
        )}
      </div>

      <div className="text-sm text-muted-foreground hidden sm:block">
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  );
}
