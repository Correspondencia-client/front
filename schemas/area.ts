import { z } from "zod";

export const areaFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export type AreaFormValues = z.infer<typeof areaFormSchema>;
