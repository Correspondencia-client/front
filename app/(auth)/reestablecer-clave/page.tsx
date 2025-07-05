"use client";

import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormWrapper } from "@/components/auth/common/form-wrapper";
import { PasswordCriteria } from "@/components/auth/common/password-criteria";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/\d/, "Debe contener al menos un número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un carácter especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof passwordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        token,
        newPassword: data.password,
      };

      const response = await api.post("/auth/reset-password", payload);

      if (response.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        router.push("/iniciar-sesion");
        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          "Algo ha ido mal. Por favor, inténtelo de nuevo.";

        if (status === 401) {
          toast.error(
            "Credenciales no válidas. Por favor, vuelve a generar un nuevo token."
          );
        } else if (status === 500) {
          toast.error("Error de servidor. Vuelva a intentarlo más tarde.");
        } else {
          toast.error(message);
        }
      } else {
        toast.error(
          "Error inesperado. Por favor, actualice e inténtelo de nuevo."
        );
      }
    }
  };

  const watchedPassword = form.watch("password");

  return (
    <FormWrapper
      type="other"
      title="Establecer Nueva Contraseña"
      description="Crea una contraseña segura para proteger tu cuenta."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu nueva contraseña"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu nueva contraseña"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Criterios de Seguridad */}
          <PasswordCriteria watchedPassword={watchedPassword} />

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
                Actualizando contraseña...
              </div>
            ) : (
              "Actualizar contraseña"
            )}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
