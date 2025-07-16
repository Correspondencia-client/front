import { VerifyEmailContent } from "@/components/auth-content/verify-email-content";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="size-12 text-blue-600 animate-spin" viewBox="0 0 50 50">
          <circle
            className="opacity-25"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
          />
          <circle
            className="opacity-75"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="75"
          />
        </svg>
        <p className="text-lg text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}
