import { MyRequestsContent } from "./my-requests-content";

export function MyRequestsContentWrapper() {
  return (
    <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
      <MyRequestsContent />
    </div>
  );
}
