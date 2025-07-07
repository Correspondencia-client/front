import { SiteHeader } from "@/components/navigation/site-header";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="relative h-dvh overflow-y-auto">
      <SiteHeader title="Panel" />
      <div className="flex flex-col gap-6">
        <h2>Panel</h2>
        <div className="h-[300px] bg-red-50"></div>
        <div className="h-[300px] bg-red-50"></div>
        <div className="h-[300px] bg-red-50"></div>
        <div className="h-[300px] bg-red-50"></div>
        <div className="h-[300px] bg-red-50"></div>
        <div className="h-[300px] bg-red-50"></div>
      </div>
      <h3>No se corta el contenido</h3>
    </div>
  );
}
