import { z } from "zod";

export const userFormSchema = z.object({
  fullName: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  role: z.enum(["ADMIN", "OFFICER", "CITIZEN"]),
  areaId: z.string().min(1, "El área es obligatoria"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
