import { AuthGradient } from "@/components/auth/common/auth-gradient";
import React from "react";

export default function AuyhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Purple Gradient */}
      <AuthGradient />

      {/* Right Side - Multi-Step Form */}
      <div className="flex-1 p-4 sm:p-6 lg:px-8 lg:py-2 h-full overflow-y-auto">
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
