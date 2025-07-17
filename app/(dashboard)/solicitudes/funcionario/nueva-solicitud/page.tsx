import { SiteHeader } from "@/components/navigation/site-header";
import { AdminNewRequestWrapper } from "@/components/requests/admin/content/admin-new-request-wrapper";
import { EntityInfoSidebar } from "@/components/users/admin/sidebar/entity-info-sidebar";

export default function NewRequestOfficerPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Nueva solicitud" />
      <div className="flex h-full">
        <EntityInfoSidebar />
        <AdminNewRequestWrapper />
      </div>
    </div>
  );
}
