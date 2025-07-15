"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, X, Loader, Wand2 } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { RichTextEditor } from "@/components/common/rich-text-editor";
import {
  replyRequestFormSchema,
  ReplyRequestFormValues,
} from "@/schemas/request";
import { replyToRequest } from "@/utils/requests";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
  REQUEST_HISTORY_QUERY_KEY,
} from "@/constants/queries";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import {
  EXTENSION_TO_TYPE_MAP,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "@/constants/files";
import { Textarea } from "@/components/ui/textarea";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

export function RequestReplyModal({
  isOpen,
  onClose,
  requestId,
}: ReplyModalProps) {
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const form = useForm<ReplyRequestFormValues>({
    resolver: zodResolver(replyRequestFormSchema),
    defaultValues: {
      title: "",
      description: "",
      aiPrompt: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  // const mounted = useRef(false);

  // useEffect(() => {
  //   mounted.current = true;
  //   return () => {
  //     mounted.current = false;
  //   };
  // }, []);

  // const handleGenerateWithAI = useDebouncedCallback(async () => {
  //   const prompt = form.getValues("aiPrompt");

  //   if (!prompt) {
  //     if (mounted.current) {
  //       form.setError("aiPrompt", {
  //         message: "Por favor, ingresa un prompt para generar el documento.",
  //       });
  //     }
  //     return;
  //   }

  //   if (mounted.current) {
  //     setIsGeneratingAI(true);
  //     form.clearErrors("aiPrompt");
  //   }

  //   try {
  //     const res = await fetch("/api/generate-text", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt, request }), // <--- Aquí envías el objeto request
  //     });
  //     const data = await res.json();
  //     let html = data.text;

  //     // Si la respuesta viene envuelta en un bloque ```html ... ```
  //     if (typeof html === "string") {
  //       html = html.trim();
  //       if (html.startsWith("```html")) {
  //         html = html.replace(/^```html/, "").replace(/```$/, "").trim();
  //       }
  //     }

  //     if (res.ok) {
  //       if (mounted.current) {
  //         form.setValue("description", html, { shouldValidate: true });
  //         form.setValue("aiPrompt", "");
  //       }
  //     } else {
  //       if (mounted.current) {
  //         form.setError("aiPrompt", { message: data.error || "Error de IA" });
  //       }
  //     }
  //   } catch (error) {
  //     if (mounted.current) {
  //       form.setError("aiPrompt", { message: "Error de red o del servidor" });
  //     }
  //   } finally {
  //     if (mounted.current) {
  //       setIsGeneratingAI(false);
  //     }
  //   }
  // }, 500);

  const handleRemoveFile = useCallback(
    (fileToRemove: File) => {
      const updatedFiles = selectedFiles.filter(
        (file) => file !== fileToRemove
      );
      setSelectedFiles(updatedFiles);

      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      form.setValue("attachment", dataTransfer.files);

      if (updatedFiles.length === 0) {
        const inputElement = document.getElementById(
          "attachment-upload"
        ) as HTMLInputElement;
        if (inputElement) {
          inputElement.value = "";
        }
      }
    },
    [selectedFiles, form]
  );

  const onSubmit = async (values: ReplyRequestFormValues) => {
    try {
      await replyToRequest(requestId, values);
      queryClient.invalidateQueries({
        queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [MY_ASSIGNED_REQUESTS_QUERY_KEY],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [REQUEST_HISTORY_QUERY_KEY],
        exact: false,
      });
      toast.success("Respuesta enviada con éxito!");
      form.reset();
      setSelectedFiles([]);
      onClose();
    } catch (error) {
      console.error("Error al enviar respuesta:", error);
      toast.error("Hubo un error al enviar la respuesta.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Responder a la solicitud{" "}
            {/* <span className="text-primary">{request.procedure.name}</span> */}
          </DialogTitle>
          <DialogDescription>
            Redacta tu respuesta para la solicitud seleccionada.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 overflow-auto p-2 -mr-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título de la Respuesta</FormLabel>
                  <FormControl>
                    <Input placeholder="Asunto de tu respuesta" {...field} />
                  </FormControl>
                  <FormDescription>
                    Un título claro para tu mensaje. Máximo 200 caracteres.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={cn(
                "hidden rounded-lg border-dotted border-2 border-purple-300 bg-purple-50 p-5 shadow-lg",
                user?.role !== "CITIZEN" && "block"
              )}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-purple-700">
                <Wand2 className="h-5 w-5 text-purple-600" />
                Generar con IA
              </h3>
              <FormField
                control={form.control}
                name="aiPrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt para IA</FormLabel>
                    <FormControl>
                      <Textarea
                      className="bg-white"
                        placeholder="Ej: Genera una respuesta formal sobre el estado de la solicitud de presupuesto."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe el tipo de documento o respuesta que deseas que
                      la IA genere.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => {}}
                className="mt-4 w-full bg-purple-400 hover:bg-purple-500"
                disabled={isGeneratingAI}
              >
                {isGeneratingAI ? (
                  <>Generando...</>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generar con IA
                  </>
                )}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido de la Respuesta</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Escribe tu respuesta detallada aquí..."
                    />
                  </FormControl>
                  <FormDescription>
                    Utiliza el editor para dar formato a tu mensaje. Mínimo 10
                    caracteres, máximo 5000.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Adjuntar Archivos (Opcional)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="attachment-upload"
                        className="flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-100"
                      >
                        {selectedFiles.length > 0 ? (
                          <div className="flex flex-col items-center gap-1 p-2">
                            <p className="text-sm font-medium mb-1">
                              Archivos seleccionados:
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                              {selectedFiles.map((file, index) => (
                                <Badge
                                  key={file.name + file.size + index} // Usar una clave más robusta
                                  variant="secondary"
                                  className="flex items-center gap-1 pr-1 text-sm"
                                >
                                  <Paperclip className="h-3 w-3" />
                                  {file.name}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation(); // Evitar que se dispare el evento del label
                                      handleRemoveFile(file);
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">
                                      Eliminar {file.name}
                                    </span>
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              className="mt-2 text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.preventDefault();
                                onChange(undefined); // Limpiar el valor del campo
                                setSelectedFiles([]); // Limpiar el array de archivos
                                const inputElement = document.getElementById(
                                  "attachment-upload"
                                ) as HTMLInputElement;
                                if (inputElement) {
                                  inputElement.value = ""; // Resetear el input de archivo
                                }
                              }}
                            >
                              <Paperclip className="h-4 w-4 mr-1" />
                              Adjuntar más archivos
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Paperclip className="h-6 w-6" />
                            <span className="text-sm">
                              Arrastra y suelta o haz clic para adjuntar
                              archivos
                            </span>
                          </div>
                        )}
                        <Input
                          id="attachment-upload"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          multiple // Permitir múltiples archivos
                          className="hidden"
                          // onChange={(event) => {
                          //   const files = event.target.files;
                          //   if (files && files.length > 0) {
                          //     // Combinar los archivos nuevos con los existentes
                          //     const newFilesArray = Array.from(files);
                          //     const combinedFiles = [
                          //       ...selectedFiles,
                          //       ...newFilesArray,
                          //     ];

                          //     // Eliminar duplicados si es necesario (por nombre y tamaño)
                          //     const uniqueCombinedFiles =
                          //       combinedFiles.filter(
                          //         (file, index, self) =>
                          //           index ===
                          //           self.findIndex(
                          //             (f) =>
                          //               f.name === file.name &&
                          //               f.size === file.size
                          //           )
                          //       );

                          //     setSelectedFiles(uniqueCombinedFiles);

                          //     // Crear un nuevo FileList para react-hook-form
                          //     const dataTransfer = new DataTransfer();
                          //     uniqueCombinedFiles.forEach((file) =>
                          //       dataTransfer.items.add(file)
                          //     );
                          //     onChange(dataTransfer.files);
                          //   } else if (selectedFiles.length === 0) {
                          //     // Si no se seleccionó nada y no había archivos, limpiar
                          //     onChange(undefined);
                          //     setSelectedFiles([]);
                          //   }
                          //   // Si se cancela la selección pero ya había archivos, no hacer nada
                          // }}
                          onChange={(event) => {
                            const files = event.target.files;
                            const rejectedFiles: string[] = [];

                            if (files && files.length > 0) {
                              const newFilesArray = Array.from(files);
                              const validFiles: File[] = [];

                              for (const file of newFilesArray) {
                                const extension = file.name
                                  .slice(file.name.lastIndexOf("."))
                                  .toLowerCase();
                                const expectedType =
                                  EXTENSION_TO_TYPE_MAP[extension];

                                const isValidType =
                                  expectedType &&
                                  (file.type === expectedType ||
                                    file.type === "");

                                if (!isValidType) {
                                  rejectedFiles.push(
                                    `${file.name} (extensión o tipo no permitido)`
                                  );
                                  continue;
                                }

                                if (file.size > MAX_FILE_SIZE_BYTES) {
                                  rejectedFiles.push(
                                    `${file.name} (excede ${MAX_FILE_SIZE_MB}MB)`
                                  );
                                  continue;
                                }

                                validFiles.push(file);
                              }

                              // Mostrar toast si hay archivos rechazados
                              if (rejectedFiles.length > 0) {
                                toast.error(
                                  <>
                                    <p className="font-semibold">
                                      Se rechazaron algunos archivos:
                                    </p>
                                    <ul className="ml-4 list-disc">
                                      {rejectedFiles.map((msg, i) => (
                                        <li key={i}>{msg}</li>
                                      ))}
                                    </ul>
                                  </>
                                );
                              }

                              // Combinar y filtrar duplicados
                              const combinedFiles = [
                                ...selectedFiles,
                                ...validFiles,
                              ];
                              const uniqueCombinedFiles = combinedFiles.filter(
                                (file, index, self) =>
                                  index ===
                                  self.findIndex(
                                    (f) =>
                                      f.name === file.name &&
                                      f.size === file.size
                                  )
                              );

                              setSelectedFiles(uniqueCombinedFiles);

                              const dataTransfer = new DataTransfer();
                              uniqueCombinedFiles.forEach((file) =>
                                dataTransfer.items.add(file)
                              );
                              onChange(dataTransfer.files);
                            } else if (selectedFiles.length === 0) {
                              onChange(undefined);
                              setSelectedFiles([]);
                            }
                          }}
                          {...fieldProps}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Tamaño máximo por archivo: 5MB. Formatos permitidos: JPG,
                    PNG, PDF, DOC, DOCX.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Respuesta
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
