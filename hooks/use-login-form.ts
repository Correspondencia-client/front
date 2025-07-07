"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginData, loginSchema } from "@/schemas/auth";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth-store";

export function useLoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      console.log(response);

      setUser({
        email: response.data.email,
        fullName: response.data.fullName,
        id: response.data.id,
        role: response.data.role,
      });
      router.push("/panel");
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error("Error al iniciar sesión", {
        description:
          axiosError.response?.data?.message ??
          axiosError.message ??
          "Ocurrió un error inesperado.",
      });

      console.error("Error al loguear usuario:", axiosError);
    }
  };

  return {
    form,
    isSubmitting,
    isValid,
    onSubmit,
  };
}
