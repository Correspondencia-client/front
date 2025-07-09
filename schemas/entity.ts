import { z } from "zod";

export const entityFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  type: z.string().min(1, "El tipo es obligatorio."),
  active: z.boolean(),
  description: z.string().min(1, "La descripción es obligatoria."),
  phone: z.string().min(1, "El teléfono es obligatorio."),
  imgUrl: z.instanceof(File).optional(),
});

export type EntityFormValues = z.infer<typeof entityFormSchema>;
