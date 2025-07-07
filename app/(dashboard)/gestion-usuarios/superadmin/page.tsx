import { SiteHeader } from "@/components/navigation/site-header";
import { EntitySidebar } from "@/components/users/super-admin/sidebar/entity-sidebar";
import { EntityContentWrapper } from "@/components/users/super-admin/content/entity-content-wrapper";

export default function UsersSuperAdminPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestión de usuarios" />
      <div className="flex h-full">
        <EntitySidebar />
        <EntityContentWrapper />
      </div>
    </div>
  );
}
