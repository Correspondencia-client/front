import * as z from "zod";

// Schema de validación para cada paso
export const registerFormSchema = z.object({
  typePerson: z.string().min(1, "Selecciona el tipo de persona"),
  typeIdentification: z.string().min(1, "Selecciona el tipo de identificación"),
  numberIdentification: z
    .string()
    .min(5, "El número de identificación debe tener al menos 5 caracteres")
    .regex(/^\d+$/, "La cédula solo debe contener números"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^\d+$/, "El número de teléfono solo debe contener números"),
  gender: z.string().min(1, "Selecciona tu género"),

  country: z.string().min(1, "Selecciona tu país"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  birthDate: z.string().min(1, "Selecciona tu fecha de nacimiento"),

  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

// Schema de validación para login
export const loginSchema = z.object({
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Correo inválido." }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
