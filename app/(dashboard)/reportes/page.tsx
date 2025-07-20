import { SiteHeader } from "@/components/navigation/site-header";
import { ReportsContent } from "@/components/reports/content/reports-content";

export default function ReportsPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Generación de Reportes" />
      <div className="flex h-full">
        <div className="flex-1 h-full p-5 md:p-8 overflow-y-auto space-y-4 bg-sidebar">
          <ReportsContent />
        </div>
      </div>
    </div>
  );
}
