import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Plus } from "lucide-react";
import { HistoryList } from "./history-list";
import { useRequestHistory } from "@/hooks/use-requests";
import { useEffect, useState } from "react";
import { RequestReplyModal } from "../../officer/content/request-reply-modal";
import { useHistoryStore } from "@/stores/history-store";

interface HistorySidebarProps {
  requestId: string;
}

export function HistorySidebar({ requestId }: HistorySidebarProps) {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const { setHistoryItem } = useHistoryStore();

  const { data: history = [], isLoading: isLoadingHisotry } =
    useRequestHistory(requestId);

  useEffect(() => {
    if (history.length > 0) {
      if (history.length === 2) {
        setHistoryItem(history[1]);
      } else if (history.length > 2) {
        setHistoryItem(history[0]);
      }
    }
  }, [history, setHistoryItem]);

  // Verificar si hay una entrada que indique que fue completada
  const isCompletedAndClosed = history.some(
    (item) => item.message === "Solicitud marcada como completada y cerrada."
  );

  return (
    <>
      {isReplyModalOpen && (
        <RequestReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          requestId={requestId}
        />
      )}
      <Card className="hidden md:flex w-80 h-full shrink-0 rounded-none border-r">
        <CardHeader className="gap-3">
          <div className="space-y-2 mb-3">
            <CardTitle>Historial de solicitud</CardTitle>
            <CardDescription>
              Acciones y eventos relacionados con esta solicitud.
            </CardDescription>
          </div>
          {!isLoadingHisotry &&
            (isCompletedAndClosed ? (
              <div className="flex items-start gap-3 rounded-md bg-emerald-100 border border-emerald-200 p-4 text-emerald-800">
                <CheckCircle className="h-5 w-5 mt-0.5 text-emerald-600" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Solicitud completada</p>
                  <p className="text-sm">
                    Esta solicitud ya fue completada y cerrada. No es posible
                    agregar más respuestas.
                  </p>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsReplyModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear respuesta
              </Button>
            ))}
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          <div className="h-full">
            <HistoryList
              requests={history}
              isLoadingHistory={isLoadingHisotry}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
