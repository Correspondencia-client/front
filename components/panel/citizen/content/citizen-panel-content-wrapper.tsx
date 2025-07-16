import { CitizenPanelContent } from "./citizen-panel-content";

export function CitizenPanelContentWrapper() {
  return (
    <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
      <div className="space-y-6">
        <CitizenPanelContent />
      </div>
    </div>
  );
}
