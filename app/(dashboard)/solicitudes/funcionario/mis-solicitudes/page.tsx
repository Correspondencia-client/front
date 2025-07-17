import { SiteHeader } from "@/components/navigation/site-header";
import { MyExternalRequestsContent } from "@/components/requests/officer/content/my-external-requests-content";

export default function MyRequestOfficerPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Historial de mis solicitudes" />
      <div className="flex h-full">
        <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
          <div className="space-y-6">
            <MyExternalRequestsContent />
          </div>
        </div>
      </div>
    </div>
  );
}
