import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRequestHistory } from "@/hooks/use-requests";
import { History } from "lucide-react";
import { RequestHistoryItem } from "./request-history-item";
import { RequestHistoryItemSkeleton } from "../skeletons/request-history-item-skeleton";

interface HistoryContentProps {
  requestId: string;
}

export function HistoryContent({ requestId }: HistoryContentProps) {
  const { data: history = [], isLoading: isLoadingHisotry } =
    useRequestHistory(requestId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <History className="h-6 w-6" />
          Historial de la solicitud
        </h2>
        <p className="text-muted-foreground">
          Aquí puedes ver todas las acciones y eventos relacionados con esta
          solicitud.
        </p>
      </div>

      {isLoadingHisotry && (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <RequestHistoryItemSkeleton key={i} isMyResponse={i % 2 === 0} />
          ))}
        </div>
      )}

      {!isLoadingHisotry && history.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sin Historial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No se encontraron eventos en el historial para esta solicitud.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoadingHisotry && history.length > 0 && (
        <div className="space-y-6">
          {history.map((item) => (
            <RequestHistoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
