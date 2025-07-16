import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenRequestContentWrapper } from "@/components/requests/citizen/content/citizen-request-content-wrapper";
import { EntityInfoSidebar } from "@/components/users/admin/sidebar/entity-info-sidebar";
import React from "react";

export default function NewReuestOfficerPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Nueva solicitud" />
      <div className="flex h-full">
        <EntityInfoSidebar />
        <CitizenRequestContentWrapper />
      </div>
    </div>
  );
}
