"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormData, registerFormSchema } from "@/schemas/auth";

export function useSignupForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      typePerson: "",
      typeIdentification: "",
      numberIdentification: "",
      phone: "",
      gender: "",
      country: "",
      city: "",
      address: "",
      birthDate: "",
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Datos del formulario:", data);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Usuario registrado exitosamente");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return {
    form,
    isSubmitting,
    isValid,
    onSubmit,
  };
}
