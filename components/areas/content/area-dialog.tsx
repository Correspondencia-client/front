"use client";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

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
import { Area } from "@/types/area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AREAS_QUERY_KEY } from "@/constants/queries";
import { createArea, updateArea } from "@/utils/areas";
import { areaFormSchema, AreaFormValues } from "@/schemas/area";
import { useEntitySelection } from "@/stores/entity-selection";
import { RequiredDot } from "@/components/common/required-dot";

interface AreaDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  areaToEdit?: Area | null;
}

export function AreaDialog({
  open,
  onOpenChange,
  areaToEdit,
}: AreaDialogProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!areaToEdit;

  const { selectedEntity } = useEntitySelection();

  const form = useForm<AreaFormValues>({
    resolver: zodResolver(areaFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (areaToEdit) {
      form.reset({
        name: areaToEdit.name,
      });
    } else {
      form.reset();
    }
  }, [areaToEdit, form]);

  useEffect(() => {
    if (open && !areaToEdit) {
      form.reset({
        name: "",
      });
    }
  }, [open, areaToEdit, form]);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: AreaFormValues) => {
    try {
      if (isEditMode) {
        await updateArea(areaToEdit!.id, data);
        toast.success("Area actualizada correctamente");
      } else {
        await createArea(data, selectedEntity!.id);
        toast.success("Area creada correctamente");
      }

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: [AREAS_QUERY_KEY] });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar area" : "Nueva area"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los datos del area seleccionada en la entidad."
              : "Crea una nueva area dentro de la entidad."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del area <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Nombre tal como aparecerán en el sistema.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-end">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && <Loader className="animate-spin" />}
                {isEditMode ? "Guardar cambios" : "Crear area"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
