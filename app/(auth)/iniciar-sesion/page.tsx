import { LoginPageForm } from "@/components/auth/login/login-page-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description:
    "Accede a tu panel de control en Gestia. Ingresa tus credenciales para gestionar tus trámites, solicitudes y comunicados de forma segura.",
  alternates: {
    canonical: "/iniciar-sesion",
  },
  robots: {
    index: true,
    follow: true, // Permite que los bots sigan otros enlaces (ej. "olvidé mi contraseña")
    nocache: true,
  },
};

export default function LoginPage() {
  return <LoginPageForm />;
}
