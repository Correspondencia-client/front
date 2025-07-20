"use client";

import { SiteHeader } from "@/components/navigation/site-header";
import { CitizenPanelContentWrapper } from "@/components/panel/citizen/content/citizen-panel-content-wrapper";
import { OfficerPanelContentWrapper } from "@/components/panel/admin/officer-panel-content-wrapper";
import { useAuthStore } from "@/stores/auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    // Aquí podrías retornar un skeleton general o spinner
    return (
      <div className="relative h-dvh overflow-y-hidden pt-12">
        <SiteHeader title="Panel" />
        <div className="flex h-full">
          <div className="flex items-center justify-center h-screen w-full bg-white">
            <svg
              className="animate-spin size-14 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-dvh overflow-y-hidden pt-12">
      <SiteHeader title="Panel" />
      <div className="flex h-full">
        {(user?.role === "CITIZEN" || user?.role === "OFFICER") && (
          <CitizenPanelContentWrapper />
        )}
        {user?.role !== "CITIZEN" &&
          user?.role !== "OFFICER" &&
          user?.role !== "SUPER" && <OfficerPanelContentWrapper />}
      </div>
    </div>
  );
}
