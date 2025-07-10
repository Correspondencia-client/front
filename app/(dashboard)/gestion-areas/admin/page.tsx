import AdminAreasContentWrapper from "@/components/areas/admin/content/admin-areas-content-wrapper";
import { SiteHeader } from "@/components/navigation/site-header";
import { EntityInfoSidebar } from "@/components/users/admin/sidebar/entity-info-sidebar";

export default function ManagementAreasAdminPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestión de areas" />
      <div className="flex h-full">
        <EntityInfoSidebar />
        <AdminAreasContentWrapper />
      </div>
    </div>
  );
}
