import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
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
          <Button onClick={() => setIsReplyModalOpen(true)}>
            <Plus />
            Crear respuesta
          </Button>
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
