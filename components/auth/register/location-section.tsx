"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import type { Control } from "react-hook-form";
import type { RegisterFormData } from "@/schemas/auth";
import { countries } from "@/constants/auth";
import { RequiredDot } from "@/components/common/required-dot";

interface LocationSectionProps {
  control: Control<RegisterFormData>;
}

export function LocationSection({ control }: LocationSectionProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <MapPin className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Ubicación y Fecha</h3>
          <p className="text-sm">¿Dónde te encuentras y cuándo naciste?</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País <RequiredDot /></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu país" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map(({ value, label }, i) => (
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad <RequiredDot /></FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección <RequiredDot /></FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu dirección completa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Nacimiento <RequiredDot /></FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
