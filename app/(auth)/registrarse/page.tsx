"use client";

import { Form } from "@/components/ui/form";
import { useSignupForm } from "@/hooks/use-signup-form";
import { PersonalDataSection } from "@/components/auth/register/personal-data-section";
import { LocationSection } from "@/components/auth/register/location-section";
import { CredentialsSection } from "@/components/auth/register/credential-section";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "@/components/auth/register/submit-button";
import { FormWrapper } from "@/components/auth/common/form-wrapper";
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
  const { form, isSubmitting, isValid, onSubmit } = useSignupForm();

  return (
    <FormWrapper
      type="register"
      title="Crea tu cuenta"
      description="Regístrate y simplifica tus solicitudes y trámites."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Data Section */}
          <PersonalDataSection control={form.control} />

          <Separator className="bg-gray-200" />

          {/* Location Section */}
          <LocationSection control={form.control} />

          <Separator className="bg-gray-200" />

          {/* Credentials Section */}
          <CredentialsSection control={form.control} watch={form.watch} />

          {/* Submit Button */}
          <SubmitButton
            isDisabled={isSubmitting || !isValid}
            isLoading={isSubmitting}
          />
        </form>
      </Form>
    </FormWrapper>
  );
}
