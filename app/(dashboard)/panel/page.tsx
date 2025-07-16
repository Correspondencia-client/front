import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenPanelContentWrapper } from "@/components/panel/citizen/content/citizen-panel-content-wrapper";

export default function DashboardPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Panel" />
      <div className="flex h-full">
        <CitizenPanelContentWrapper />
      </div>
    </div>
  );
}
