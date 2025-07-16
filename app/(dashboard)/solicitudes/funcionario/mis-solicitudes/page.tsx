import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenHistoryContentWrapper } from "@/components/requests/citizen-requests-history/content/citizen-history-content-wrapper";

export default function MyRequestOfficerPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Historial de mis solicitudes" />
      <div className="flex h-full">
        <CitizenHistoryContentWrapper />
      </div>
    </div>
  );
}
