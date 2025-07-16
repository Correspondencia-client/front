"use client"

import { SiteHeader } from "@/components/navigation/site-header";
import { MyRequestsContentWrapper } from "@/components/requests/officer/content/my-requests-content-wrapper";

export default function MyAssignedPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestionar mis asignaciones" />
      <div className="flex h-full">
        <MyRequestsContentWrapper />
      </div>
    </div>
  );
}
