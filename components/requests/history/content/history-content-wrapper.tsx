import { HistoryContent } from "./history-content";

interface HistoryContentWrapperProps {
  requestId: string;
}

export function HistoryContentWrapper({ requestId }: HistoryContentWrapperProps) {
  return (
    <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
      <HistoryContent requestId={requestId} />
    </div>
  );
}
