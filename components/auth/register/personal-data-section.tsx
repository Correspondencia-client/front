"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import type { Control } from "react-hook-form";
import type { RegisterFormData } from "@/schemas/auth";
import { gender, identificationType, typeOfPerson } from "@/constants/auth";
import { RequiredDot } from "@/components/common/required-dot";

interface PersonalDataSectionProps {
  control: Control<RegisterFormData>;
}

export function PersonalDataSection({ control }: PersonalDataSectionProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Datos Personales</h3>
          <p className="text-sm">Información básica sobre ti</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Nombre Completo <RequiredDot /></FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="typePerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Persona <RequiredDot /></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeOfPerson.map(({ value, label }, i) => (
                    <SelectItem key={i} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="typeIdentification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Identificación <RequiredDot /></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {identificationType.map(({ value, label }, i) => (
                    <SelectItem key={i} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="numberIdentification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Identificación <RequiredDot /></FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu número de identificación"
                  {...field}
                />
              </FormControl>
              <FormDescription>Solo debe contener números</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono <RequiredDot /></FormLabel>
              <FormControl>
                <Input placeholder="300 123 4567" {...field} />
              </FormControl>
              <FormDescription>Solo debe contener números</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Género <RequiredDot /></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gender.map(({ value, label }, i) => (
                    <SelectItem key={i} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
