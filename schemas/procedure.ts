import { z } from "zod";

export const procedureFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  maxResponseDays: z
    .string()
    .min(1, "Este campo es obligatorio")
    .refine(
      (val) =>
        !isNaN(Number(val)) && Number(val) > 0 && Number.isInteger(Number(val)),
      {
        message: "Debe ser un número entero mayor a 0",
      }
    ),
});

export type ProcedureFormValues = z.infer<typeof procedureFormSchema>;
