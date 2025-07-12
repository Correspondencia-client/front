import { z } from "zod";

export const citizenRequestFormSchema = z.object({
  procedureId: z
    .string({
      required_error: "Debe seleccionar un tipo de solicitud.",
    })
    .min(1, "Debe seleccionar un tipo de solicitud."),
  title: z
    .string({
      required_error: "El título es requerido.",
    })
    .min(1, "El título es requerido.")
    .max(200, "El título no puede exceder 200 caracteres."),
  description: z
    .string({
      required_error: "La descripción es requerida.",
    })
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(5000, "La descripción no puede exceder 5000 caracteres."),
});

export type CitizenRequestFormValues = z.infer<typeof citizenRequestFormSchema>;