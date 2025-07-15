"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/common/rich-text-editor";
import { toast } from "sonner";
import {
  citizenRequestFormSchema,
  CitizenRequestFormValues,
} from "@/schemas/request";
import { createCitizenRequest } from "@/utils/requests";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, Paperclip, Send, X } from "lucide-react";
import { MobileEntitySelector } from "@/components/common/mobile-entity-selector";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  ALLOWED_FILE_TYPES,
  EXTENSION_TO_TYPE_MAP,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from "@/constants/files";

export function CitizenRequestContent() {
  const { selectedEntity } = useEntitySelection();

  const form = useForm<CitizenRequestFormValues>({
    resolver: zodResolver(citizenRequestFormSchema),
    defaultValues: {
      procedureId: "",
      title: "",
      description: "",
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Función para manejar la eliminación de un archivo individual
  const handleRemoveFile = useCallback(
    (fileToRemove: File) => {
      const updatedFiles = selectedFiles.filter(
        (file) => file !== fileToRemove
      );
      setSelectedFiles(updatedFiles);

      // Crear un nuevo FileList para actualizar el campo del formulario
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      form.setValue("attachment", dataTransfer.files, { shouldValidate: true });

      // Si no quedan archivos, resetear el input de archivo para permitir re-selección
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

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: CitizenRequestFormValues) => {
    try {
      await createCitizenRequest(values);
      toast.success("Solicitud enviada correctamente");
      form.reset();
      setSelectedFiles([]); // Limpiar los archivos seleccionados
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Error al enviar la solicitud"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Crear nueva solicitud
        </h2>
        <p className="text-muted-foreground">
          Complete el formulario para enviar su solicitud a la entidad
          correspondiente.
        </p>
      </div>

      <MobileEntitySelector
        title="Información de la entidad"
        description="Seleccione el tipo de entidad y la entidad específica a la que desea
            dirigir su solicitud."
      />

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Solicitud</CardTitle>
          <CardDescription>
            Proporcione un título claro y una descripción detallada de su
            solicitud.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="procedureId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Solicitud</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={
                        !selectedEntity ||
                        !selectedEntity.procedures ||
                        selectedEntity.procedures.length === 0
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedEntity
                                ? "Seleccione el tipo de solicitud"
                                : "Primero seleccione una entidad"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedEntity?.procedures?.map((entity) => (
                          <SelectItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {selectedEntity?.procedures?.length === 0
                        ? "La entidad actualmente no posee procesos."
                        : !selectedEntity
                        ? "Debe seleccionar una entidad antes de elegir el tipo de solicitud."
                        : "Seleccione el tipo de solicitud que mejor describe su petición."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título de la Solicitud</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese un título descriptivo para su solicitud"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Máximo 200 caracteres. Caracteres usados:{" "}
                      {field.value?.length || 0}/200
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Detallada</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                        placeholder="Describa detalladamente su solicitud, incluyendo toda la información relevante..."
                      />
                    </FormControl>
                    <FormDescription>
                      Use las herramientas de formato para estructurar mejor su
                      solicitud. Mínimo 10 caracteres, máximo 5000.
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
                                const uniqueCombinedFiles =
                                  combinedFiles.filter(
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

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/">Cancelar</Link>
                </Button>
                <div id="enviar-solicitud">
                  <Button disabled={!isValid || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar solicitud
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
