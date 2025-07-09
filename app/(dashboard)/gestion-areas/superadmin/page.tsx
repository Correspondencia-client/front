import { AreasContentWrapper } from "@/components/areas/content/areas-content-wrapper";
import { SiteHeader } from "@/components/navigation/site-header";
import { EntitySidebar } from "@/components/users/super-admin/sidebar/entity-sidebar";

export default function ManagementAreasSuperAdminPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestión de areas" />
      <div className="flex h-full">
        <EntitySidebar />
        <AreasContentWrapper />
      </div>
    </div>
  );
}
