import { AreasContent } from "@/components/areas/content/areas-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminProceduresContent } from "@/components/areas/admin/content/admin-procedures-content";
import { EntityInfo } from "@/components/common/entity-info";

export function AdminAreasContent() {
  return (
    <>
      <div className="mb-3 bg-card text-card-foreground flex flex-col rounded-xl p-6 border">
        <h2 className="text-2xl font-bold tracking-tight lg:max-w-3xl">
          Gestión de áreas y procesos
        </h2>
        <p className="text-muted-foreground">
          Organiza y administra las áreas de trabajo y sus procesos asociados.
          Define tiempos de respuesta y mantén un control centralizado de la
          estructura organizacional.
        </p>
      </div>
      <EntityInfo className="relative bg-white shadow-none border md:hidden" />
      <Tabs defaultValue="areas" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="areas">Áreas</TabsTrigger>
          <TabsTrigger value="processes">Procesos</TabsTrigger>
        </TabsList>

        <TabsContent value="areas" className="space-y-4">
          <AreasContent />
        </TabsContent>

        <TabsContent value="processes" className="space-y-4">
          <AdminProceduresContent />
        </TabsContent>
      </Tabs>
    </>
  );
}
