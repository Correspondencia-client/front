"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginData, loginSchema } from "@/schemas/auth";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth-store";
import { useEntitySelection } from "@/stores/entity-selection";
import { useAreaSelection } from "@/stores/area-selection";

export function useLoginForm() {
  const router = useRouter();
  const { setUser, clearUser } = useAuthStore();
  const { setEntity, clearSelection } = useEntitySelection();
  const { clearArea } = useAreaSelection();

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

      clearSelection();
      clearArea();
      clearUser();

      const { email, fullName, id, role, entity, area } = response.data;

      setUser({
        email,
        fullName,
        id,
        role,
        entity: entity
          ? {
              id: entity.id,
              name: entity.name,
              imageUrl: entity.imgUrl,
            }
          : undefined,
        area: area ?? undefined,
      });

      // Guardar entidad en la selección (si existe)
      if (entity) {
        setEntity({
          id: entity.id,
          name: entity.name,
          imgUrl: entity.imgUrl,
          active: entity.active,
          areas: [],
          createdAt: entity.createdAt,
          description: entity.description,
          phone: entity.phone,
          type: entity.type,
          updatedAt: "",
        });
      }

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
    }
  };

  return {
    form,
    isSubmitting,
    isValid,
    onSubmit,
  };
}
