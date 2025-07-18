import { RegisterPageForm } from "@/components/auth/register/register-page-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regístrate Gratis",
  description:
    "Crea tu cuenta en Gestia en pocos pasos. Únete a la plataforma para simplificar la gestión de tus trámites y solicitudes de manera gratuita y segura.",
  alternates: {
    canonical: "/registrarse",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export default function RegisterPage() {
  return <RegisterPageForm />;
}
