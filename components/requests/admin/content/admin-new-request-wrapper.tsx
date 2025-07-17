"use client"

import { AdminNewRequestContent } from "./admin-new-request-content";

export function AdminNewRequestWrapper() {
  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      <AdminNewRequestContent />
    </div>
  );
}
