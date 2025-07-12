"use client";

import { CitizenRequestContent } from "./citizen-request-content";

export function CitizenRequestContentWrapper() {
  return (
    <div className="flex-1 h-full p-3 md:p-5 overflow-y-auto space-y-4 bg-sidebar">
      <CitizenRequestContent />
    </div>
  );
}
