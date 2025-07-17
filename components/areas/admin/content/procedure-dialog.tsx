"use client";

import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RequiredDot } from "@/components/common/required-dot";

import { procedureFormSchema, ProcedureFormValues } from "@/schemas/procedure";
import { createProcedure, updateProcedure } from "@/utils/procedures";
import { useEntitySelection } from "@/stores/entity-selection";
import { useAreaSelection } from "@/stores/area-selection";
import { PROCEDURES_QUERY_KEY } from "@/constants/queries";
import { Procedure } from "@/types/procedure";

interface ProcedureDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  procedureToEdit?: Procedure | null;
}

export function ProcedureDialog({
  open,
  onOpenChange,
  procedureToEdit,
}: ProcedureDialogProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!procedureToEdit;

  const { selectedEntity } = useEntitySelection();
  const { selectedArea } = useAreaSelection();

  const form = useForm<ProcedureFormValues>({
    resolver: zodResolver(procedureFormSchema),
    defaultValues: {
      name: "",
      description: "",
      maxResponseDays: "0",
    },
  });

  useEffect(() => {
    if (procedureToEdit) {
      form.reset({
        name: procedureToEdit.name,
        description: procedureToEdit.description,
        maxResponseDays: String(procedureToEdit.maxResponseDays),
      });
    } else {
      form.reset();
    }
  }, [procedureToEdit, form]);

  useEffect(() => {
    if (open && !procedureToEdit) {
      form.reset({
        name: "",
        description: "",
        maxResponseDays: "0",
      });
    }
  }, [open, procedureToEdit, form]);

  const { isValid, isSubmitting } = form.formState;

  const maxResponseDaysRaw = form.watch("maxResponseDays");

  const isMaxResponseDaysValid = (() => {
    const parsed = Number(maxResponseDaysRaw);
    return !isNaN(parsed) && Number.isInteger(parsed) && parsed >= 0;
  })();

  const onSubmit = async (data: ProcedureFormValues) => {
    try {
      if (isEditMode) {
        await updateProcedure(procedureToEdit!.id, selectedArea!.id, data);
        toast.success("Procedimiento actualizado correctamente");
      } else {
        await createProcedure(data, selectedEntity!.id, selectedArea!.id);
        toast.success("Procedimiento creado correctamente");
      }

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: [PROCEDURES_QUERY_KEY] });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error al guardar el procedimiento"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar procedimiento" : "Nuevo procedimiento"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los datos del procedimiento."
              : "Crea un nuevo procedimiento en el área seleccionada."}
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
                    Nombre <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del procedimiento" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Nombre con el que se identificará el procedimiento.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el procedimiento..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Explica brevemente en qué consiste el procedimiento.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxResponseDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Máx. días de respuesta <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormDescription>
                    Número máximo de días hábiles para dar respuesta al trámite.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting || !isMaxResponseDaysValid}
              >
                {isSubmitting && <Loader className="animate-spin mr-2" />}
                {isEditMode ? "Guardar cambios" : "Crear procedimiento"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
