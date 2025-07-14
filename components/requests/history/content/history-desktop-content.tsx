import React from "react";
import { RequestHistoryItem } from "./request-history-item";
import { useHistoryStore } from "@/stores/history-store";
import { RequestHistoryItemSkeleton } from "../skeletons/request-history-item-skeleton";

export function HistoryDesktopContent() {
  const { selectedHistoryItem } = useHistoryStore();

  return (
    <div className="hidden md:block">
      <div className="pb-4">
        <h3 className="text-2xl font-bold">Detalles del Evento</h3>
        <p>Información completa del evento seleccionado en el historial.</p>
      </div>
      {selectedHistoryItem ? (
        <RequestHistoryItem
          type="Desktop"
          key={selectedHistoryItem.id}
          item={selectedHistoryItem}
          isExpanded={true}
          onToggle={() => {}}
        />
      ) : (
        <RequestHistoryItemSkeleton isMyResponse={false} />
      )}
    </div>
  );
}
