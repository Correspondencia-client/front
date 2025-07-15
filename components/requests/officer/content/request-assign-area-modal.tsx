"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssignedRequestItem } from "@/types/requests";
import { assignRequestToArea } from "@/utils/requests";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
} from "@/constants/queries";
import { useEntitySelection } from "@/stores/entity-selection";
import { useAreasByEntity } from "@/hooks/use-areas";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { AxiosError } from "axios";

const assignAreaSchema = z.object({
  toAreaId: z.string().min(1, "Seleccione un área"),
  message: z.string().min(5, "Escriba un mensaje de asignación"),
});

type RequestAssignAreaFormValues = z.infer<typeof assignAreaSchema>;

interface RequestAssignAreaModalProps {
  isOpen: boolean;
  request: AssignedRequestItem | null;
  onClose: () => void;
}

export function RequestAssignAreaModal({
  isOpen,
  request,
  onClose,
}: RequestAssignAreaModalProps) {
  const queryClient = useQueryClient();
  const { selectedEntity } = useEntitySelection();

  const { data: areaData, isLoading } = useAreasByEntity({
    entityId: selectedEntity!.id,
    name: "",
    limit: 20,
    page: 1,
  });

  const form = useForm<RequestAssignAreaFormValues>({
    resolver: zodResolver(assignAreaSchema),
    defaultValues: {
      toAreaId: "",
      message: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  useEffect(() => {
    form.reset();
  }, [isOpen]);

  const handleSubmit = async (data: RequestAssignAreaFormValues) => {
    if (!request) return;

    try {
      await assignRequestToArea(request.id, data);

      toast.success("Solicitud transferida correctamente");

      await queryClient.invalidateQueries({
        queryKey: [MY_ASSIGNED_REQUESTS_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
      });

      form.reset();
      onClose();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Ocurrió un error al transferir la solicitud");
      }
    }
  };

  const availableAreas = areaData?.areas ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transferir solicitud</DialogTitle>
          <DialogDescription>
            Asigne esta solicitud a otra área junto con un mensaje de contexto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="toAreaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área destino</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un área" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje de asignación</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Explique por qué transfiere esta solicitud..."
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Indique el motivo de la transferencia o instrucciones para
                    el área receptora.
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && <Loader className="animate-spin" />}
                {isSubmitting ? "Enviando..." : "Tranferir solicitud"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
