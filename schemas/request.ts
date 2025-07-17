import { z } from "zod";

export const citizenRequestFormSchema = z.object({
  procedureId: z.string().min(1, "Debe seleccionar un tipo de solicitud."),
  title: z
    .string()
    .min(1, "El título es requerido.")
    .max(200, "El título no puede exceder 200 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(5000, "La descripción no puede exceder 5000 caracteres."),
  attachment: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // No files, valid
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!(file instanceof File)) return false; // Ensure it's a File object
        if (file.size > 5 * 1024 * 1024) return false; // Check size for each file (5MB)
        if (
          ![
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        )
          return false; // Check type for each file
      }
      return true; // All files passed validation
    }, "El tamaño máximo por archivo es 5MB y solo se permiten imágenes (JPG/PNG), PDF y documentos de Word."),
});

export const adminRequestFormSchema = z.object({
  requestType: z
  .string()
  .min(1, "Este campo es obligatorio.")
  .max(100, "No puede exceder los 100 caracteres."),
  recipientEmail: z.email("Debe ser un correo válido."),
  recipientName: z
    .string()
    .min(1, "El nombre del destinatario es requerido.")
    .max(200, "El nombre no puede exceder 200 caracteres."),
  title: z
    .string()
    .min(1, "El título es requerido.")
    .max(200, "El título no puede exceder 200 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(5000, "La descripción no puede exceder 5000 caracteres."),
  attachment: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // No files, valid
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!(file instanceof File)) return false; // Ensure it's a File object
        if (file.size > 5 * 1024 * 1024) return false; // Check size for each file (5MB)
        if (
          ![
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        )
          return false; // Check type for each file
      }
      return true; // All files passed validation
    }, "El tamaño máximo por archivo es 5MB y solo se permiten imágenes (JPG/PNG), PDF y documentos de Word."),
});

export type CitizenRequestFormValues = z.infer<typeof citizenRequestFormSchema>;
export type AdminRequestFormValues = z.infer<typeof adminRequestFormSchema>;

// Esquema de validación para el formulario de respuesta
export const replyRequestFormSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres.")
    .max(200, "El título no puede exceder 200 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(5000, "La descripción no puede exceder 5000 caracteres."),
  aiPrompt: z.string().optional(),
  attachment: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true; // No files, valid
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!(file instanceof File)) return false; // Ensure it's a File object
        if (file.size > 5 * 1024 * 1024) return false; // Check size for each file (5MB)
        if (
          ![
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        )
          return false; // Check type for each file
      }
      return true; // All files passed validation
    }, "El tamaño máximo por archivo es 5MB y solo se permiten imágenes (JPG/PNG), PDF y documentos de Word."),
});

export type ReplyRequestFormValues = z.infer<typeof replyRequestFormSchema>;
