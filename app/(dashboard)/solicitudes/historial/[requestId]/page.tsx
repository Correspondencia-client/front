"use client";

import { use } from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { HistoryContentWrapper } from "@/components/requests/history/content/history-content-wrapper";

export default function RequestHistoryPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = use(params);

  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Historial de la solicitud" />
      <div className="flex h-full">
        <HistoryContentWrapper requestId={requestId} />
      </div>
    </div>
  );
}
