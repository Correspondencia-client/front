import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenRequestContentWrapper } from "@/components/requests/citizen/content/citizen-request-content-wrapper";
import { CitizenRequestSidebar } from "@/components/requests/citizen/sidebar/citizen-request-sidebar";

export default function NewRequestPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Nueva solicitud" />
      <div className="flex h-full">
        <CitizenRequestSidebar />
        <CitizenRequestContentWrapper />
      </div>
    </div>
  );
}
