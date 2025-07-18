"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormWrapper } from "@/components/auth/common/form-wrapper";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "@/hooks/use-login-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";

export function LoginPageForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { form, isSubmitting, isValid, onSubmit } = useLoginForm();

  return (
    <div className="h-screen flex items-center">
      <FormWrapper
        type="login"
        title="Bienvenido a Gestia"
        description="Conéctate con la plataforma y continúa con tus gestiones fácilmente."
        className="lg:min-w-md"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          {...field}
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
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/recuperar-clave"
                className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" />
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
