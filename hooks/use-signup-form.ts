"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormData, registerFormSchema } from "@/schemas/auth";
import { toast } from "sonner";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function useSignupForm() {
  const router = useRouter();

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
    const payload = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      typePerson: data.typePerson,
      typeIdentification: data.typeIdentification,
      numberIdentification: data.numberIdentification,
      phone: data.phone,
      gender: data.gender,
      country: data.country,
      birthDate: new Date(data.birthDate).toISOString(),
      address: data.address,
      city: data.city,
    };

    try {
      await api.post("/auth/register-citizen", payload);

      toast.success("Registro exitoso", {
        description:
          "Hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.",
      });

      router.push("/iniciar-sesion");
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error("Error al registrarse", {
        description:
          axiosError.response?.data?.message ??
          axiosError.message ??
          "Ocurrió un error inesperado.",
      });

      console.error("Axios error:", axiosError);
    }
  };

  return {
    form,
    isSubmitting,
    isValid,
    onSubmit,
  };
}
