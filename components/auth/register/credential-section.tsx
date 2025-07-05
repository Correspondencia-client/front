"use client"

import { useState } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Shield } from "lucide-react"
import type { Control, UseFormWatch } from "react-hook-form"
import type { RegisterFormData } from "@/schemas/auth"

interface CredentialsSectionProps {
  control: Control<RegisterFormData>
  watch: UseFormWatch<RegisterFormData>
}

export function CredentialsSection({ control, watch }: CredentialsSectionProps) {
  const [showPassword, setShowPassword] = useState(false)

  // Verificar si todos los campos excepto contraseña están completos para mostrar resumen
  const formValues = watch()
  const isReadyForSummary =
    formValues.typePerson &&
    formValues.typeIdentification &&
    formValues.numberIdentification &&
    formValues.phone &&
    formValues.gender &&
    formValues.country &&
    formValues.city &&
    formValues.address &&
    formValues.birthDate &&
    formValues.fullName &&
    formValues.email

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Shield className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Credenciales de Acceso</h3>
          <p className="text-sm">Información para acceder a tu cuenta</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={control}
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
          control={control}
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
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
            </FormItem>
          )}
        />

        {/* Summary Section */}
        {isReadyForSummary && (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-blue-100 rounded">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="font-medium">Resumen de tu información</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="text-gray-500 font-medium">Nombre:</span>{" "}
                  <span className="text-gray-700">{watch("fullName")}</span>
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Email:</span>{" "}
                  <span className="text-gray-700">{watch("email")}</span>
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Teléfono:</span>{" "}
                  <span className="text-gray-700">{watch("phone")}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-500 font-medium">País:</span>{" "}
                  <span className="text-gray-700">{watch("country")}</span>
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Ciudad:</span>{" "}
                  <span className="text-gray-700">{watch("city")}</span>
                </p>
                <p>
                  <span className="text-gray-500 font-medium">Tipo:</span>{" "}
                  <span className="text-gray-700">{watch("typePerson")}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
