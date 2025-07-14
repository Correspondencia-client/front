"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useHistoryStore } from "@/stores/history-store";
import { RequestHistoryItem } from "@/types/requests";
import { Calendar } from "lucide-react";

interface HistoryItemProps {
  history: RequestHistoryItem;
}

export function HistoryItem({ history }: HistoryItemProps) {
  const { user } = useAuthStore();
  const { selectedHistoryItem, setHistoryItem } = useHistoryStore();

  const isSelected = selectedHistoryItem?.id === history.id;
  const isMyResponse = history?.updatedBy?.email === user?.email;

  const cardClass = cn(
    "w-full h-auto justify-start p-3 text-left flex flex-col items-start gap-1 border transition-all duration-150",
    {
      "bg-accent text-accent-foreground border-blue-500 ring-1 ring-blue-500":
        isSelected,
      "bg-card hover:bg-muted": !isSelected,
      "border-blue-200 bg-blue-50 hover:bg-blue-100":
        isMyResponse && !isSelected,
      hidden: history.message === "Solicitud asignada automáticamente.",
    }
  );

  return (
    <Button
      key={history.id}
      variant="ghost"
      className={cardClass}
      onClick={() => setHistoryItem(history)}
    >
      <div className="flex items-center gap-2 w-full">
        <span className="font-medium text-base flex-1 truncate">
          {history.message}
        </span>
        {isMyResponse && (
          <Badge
            variant="secondary"
            className="bg-blue-200 text-blue-800 text-xs"
          >
            Tu Respuesta
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground w-full">
        <Calendar className="h-3 w-3" />
        <span>{new Date(history.createdAt).toLocaleDateString()}</span>
      </div>
    </Button>
  );
}
