// app/(auth)/verificacion-correo/verify-email-content.tsx
"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import api from "@/lib/axios";

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Verificación fallida", {
        description: "Token no proporcionado.",
      });
      router.push("/iniciar-sesion");
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        toast.success("Correo verificado", {
          description: "Tu cuenta ha sido verificada correctamente.",
        });
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error("Error al verificar el correo", {
          description:
            axiosError.response?.data?.message ??
            axiosError.message ??
            "Ocurrió un error inesperado al verificar el correo.",
        });
      } finally {
        router.push("/iniciar-sesion");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

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
        <p className="text-lg text-muted-foreground">Verificando correo...</p>
      </div>
    </div>
  );
}
