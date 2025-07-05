"use client";

import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/schemas/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/auth/common/form-wrapper";

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await api.post("/auth/forgot-password", data);

      if (response.status === 200) {
        toast.success(
          "Correo enviado. Por favor, revisa tu bandeja de entrada."
        );
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
            "Credenciales no válidas. Por favor, compruebe su correo electrónico."
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

  return (
    <div className="h-screen flex items-center">
      <FormWrapper
        type="other"
        title="Recuperar Contraseña"
        description="Ingresa tu email y te enviaremos un correo para restablecer tu contraseña."
        className="lg:min-w-md"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting} className="w-full">
              {isSubmitting && <Loader className="animate-spin" />}
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
