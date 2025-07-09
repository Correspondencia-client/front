"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { RequiredDot } from "@/components/common/required-dot";
import { entityFormSchema, EntityFormValues } from "@/schemas/entity";
import { useQueryClient } from "@tanstack/react-query";
import { Entity } from "@/types/entity";
import { ENTITIES_QUERY_KEY } from "@/constants/queries";
import { useEntitySelection } from "@/stores/entity-selection";
import { AxiosError } from "axios";
import { createEntity, updateEntity } from "@/utils/entities";

interface EntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityToEdit?: Entity | null;
}

export function EntityDialog({
  open,
  onOpenChange,
  entityToEdit,
}: EntityDialogProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!entityToEdit;
  const { selectedEntityType } = useEntitySelection();

  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entityFormSchema),
    defaultValues: {
      name: "",
      type: selectedEntityType,
      active: true,
      description: "",
      phone: "",
      imgUrl: undefined as unknown as File,
    },
  });

  useEffect(() => {
    if (entityToEdit) {
      form.reset({
        name: entityToEdit.name,
        type: entityToEdit.type ?? selectedEntityType,
        active: entityToEdit.active,
        description: entityToEdit.description,
        phone: entityToEdit.phone,
        imgUrl: undefined as unknown as File,
      });
    } else {
      form.reset();
    }
  }, [entityToEdit, selectedEntityType, form]);

  useEffect(() => {
    if (open && !entityToEdit) {
      form.reset({
        name: "",
        type: selectedEntityType,
        active: true,
        description: "",
        phone: "",
        imgUrl: undefined as unknown as File,
      });
    }
  }, [open, entityToEdit, form]);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: EntityFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("phone", data.phone);
      formData.append("type", data.type);
      formData.append("active", JSON.stringify(data.active));

      if (data.imgUrl instanceof File) {
        formData.append("imgUrl", data.imgUrl);
      }

      if (isEditMode) {
        await updateEntity(entityToEdit!.id, formData);
        toast.success("Entidad actualizada correctamente");
      } else {
        await createEntity(formData);
        toast.success("Entidad creada correctamente");
      }

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90%] overflow-y-auto max-h-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar entidad" : "Nueva entidad"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los datos de la entidad."
              : "Crea una nueva entidad para tu sistema."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Imagen */}
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => {
                const file = field.value as File | undefined;
                const [preview, setPreview] = useState<string | null>(null);

                // Mostrar la imagen actual si no hay nueva cargada
                useEffect(() => {
                  if (file instanceof File) {
                    const objectUrl = URL.createObjectURL(file);
                    setPreview(objectUrl);
                    return () => URL.revokeObjectURL(objectUrl);
                  }

                  if (!file && entityToEdit?.imgUrl) {
                    setPreview(entityToEdit.imgUrl); // ← imagen actual desde el backend
                  }
                }, [file, entityToEdit]);

                return (
                  <FormItem>
                    <FormLabel>
                      Imagen <RequiredDot />
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label className="relative flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="object-cover w-full h-full rounded-lg"
                            />
                          ) : (
                            <span className="text-sm text-gray-500 text-center px-2">
                              Seleccionar imagen
                            </span>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const selectedFile = e.target.files?.[0];
                              if (selectedFile) field.onChange(selectedFile);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </label>

                        {/* Botón para quitar imagen seleccionada */}
                        {file && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              field.onChange(undefined);
                              setPreview(entityToEdit?.imgUrl ?? null);
                            }}
                          >
                            Quitar imagen
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Selecciona una imagen representativa para la entidad.
                    </FormDescription>
                  </FormItem>
                );
              }}
            />

            {/* Nombre */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la entidad" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    El nombre oficial de la entidad.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Breve descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Un resumen o propósito de la entidad.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Teléfono */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Teléfono <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Número de contacto" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Número de contacto para soporte o comunicación.
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Estado activo */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <FormLabel>¿Entidad activa?</FormLabel>
                    <FormDescription>
                      Indica si la entidad está habilitada en el sistema.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)} // importante
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-end">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && (
                  <Loader className="animate-spin mr-2" size={16} />
                )}
                {isEditMode ? "Guardar cambios" : "Crear entidad"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
