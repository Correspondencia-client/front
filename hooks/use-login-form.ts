"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginData, loginSchema } from "@/schemas/auth";

export function useLoginForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:"",
      password: ""
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: LoginData) => {
    console.log("Datos del formulario:", data);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Usuario logueado exitosamente");
    } catch (error) {
      console.error("Error al loguear usuario:", error);
    }
  };

  return {
    form,
    isSubmitting,
    isValid,
    onSubmit,
  };
}
