import { EntitiesContent } from "./entities-content";

export function EntitiesContentWrapper() {
  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      <EntitiesContent />
    </div>
  );
}
