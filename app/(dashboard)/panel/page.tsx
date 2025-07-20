"use client"

import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenPanelContentWrapper } from "@/components/panel/citizen/content/citizen-panel-content-wrapper";
import { OfficerPanelContentWrapper } from "@/components/panel/admin/officer-panel-content-wrapper";
import { useAuthStore } from "@/stores/auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Panel" />
      <div className="flex h-full">
        {user?.role === "CITIZEN" || user?.role === "OFFICER" && <CitizenPanelContentWrapper />}
        {user?.role !== "SUPER" && user?.role !== "CITIZEN" && user?.role !== "OFFICER" && <OfficerPanelContentWrapper />}
      </div>
    </div>
  );
}
