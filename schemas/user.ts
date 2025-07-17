import { z } from "zod";

export const userFormSchema = z.object({
  fullName: z.string().min(1, "El nombre es obligatorio"),
  email: z.email("Correo inválido"),
  role: z.enum(["ADMIN", "OFFICER"]),
  areaId: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
