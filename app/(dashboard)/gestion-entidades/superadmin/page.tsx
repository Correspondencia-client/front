import { EntitiesContentWrapper } from "@/components/entities/content/entities-content-wrapper";
import { SiteHeader } from "@/components/navigation/site-header";

export default function ManagementEntitiesPage() {
  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Gestión de entidades" />
      <div className="flex h-full">
        <EntitiesContentWrapper />
      </div>
    </div>
  );
}
