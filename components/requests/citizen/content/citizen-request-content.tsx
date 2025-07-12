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
import { Loader, Send } from "lucide-react";
import { MobileEntitySelector } from "@/components/common/mobile-entity-selector";

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

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: CitizenRequestFormValues) => {
    try {
      await createCitizenRequest(values);
      toast.success("Solicitud enviada correctamente");
      form.reset();
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
                        Enviar Solicitud
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
