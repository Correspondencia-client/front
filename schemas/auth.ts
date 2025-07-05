import * as z from "zod"

// Schema de validación para cada paso
export const step1Schema = z.object({
  typePerson: z.string().min(1, "Selecciona el tipo de persona"),
  typeIdentification: z.string().min(1, "Selecciona el tipo de identificación"),
  numberIdentification: z.string().min(5, "El número de identificación debe tener al menos 5 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  gender: z.string().min(1, "Selecciona tu género"),
})

export const step2Schema = z.object({
  country: z.string().min(1, "Selecciona tu país"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  birthDate: z.string().min(1, "Selecciona tu fecha de nacimiento"),
})

export const step3Schema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})

// Schema completo
export const registerFormSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export type RegisterFormData = z.infer<typeof registerFormSchema>

// Schema de validación para login
export const loginSchema = z.object({
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

export type LoginData = z.infer<typeof loginSchema>
