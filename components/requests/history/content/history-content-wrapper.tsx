import { HistoryDesktopContent } from "./history-desktop-content";
import HistoryMobileContent from "./history-mobile-content";

interface HistoryContentWrapperProps {
  requestId: string;
}

export function HistoryContentWrapper({
  requestId,
}: HistoryContentWrapperProps) {
  return (
    <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
      <div className="max-w-5xl mx-auto space-y-6">
        <HistoryMobileContent requestId={requestId} />

        <HistoryDesktopContent />
      </div>
    </div>
  );
}
