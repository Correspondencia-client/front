import { OfficerPanelContent } from "./officer-panel-content";

export function OfficerPanelContentWrapper() {
  return (
    <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
      <div className="space-y-6">
        <OfficerPanelContent />
      </div>
    </div>
  );
}
