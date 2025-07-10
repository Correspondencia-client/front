import { SiteHeader } from "@/components/navigation/site-header";
import { UsersContentWrapper } from "@/components/users/admin/content/users-content-wrapper";
import { EntityInfoSidebar } from "@/components/users/admin/sidebar/entity-info-sidebar";

export default function UsersAdminPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestión de usuarios" />
      <div className="flex h-full">
        <EntityInfoSidebar />
        <UsersContentWrapper />
      </div>
    </div>
  );
}
