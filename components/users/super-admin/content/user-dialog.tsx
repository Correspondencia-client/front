"use client";

import { useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
import { Area } from "@/types/area";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "@/utils/users";
import { userFormSchema, UserFormValues } from "@/schemas/user";
import { Loader } from "lucide-react";
import { RequiredDot } from "@/components/common/required-dot";
import { userRoles } from "@/constants/user";
import { KPI_QUERY_KEY, USER_BY_ENTITY_QUERY_KEY } from "@/constants/queries";
import { useEntitySelection } from "@/stores/entity-selection";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth-store";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  userToEdit?: User | null;
  areas: Area[];
}

export function UserDialog({
  open,
  onOpenChange,
  areas,
  userToEdit,
}: UserDialogProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!userToEdit;

  const { user } = useAuthStore();
  const { selectedEntity } = useEntitySelection();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "OFFICER",
      areaId: "",
    },
  });

  useEffect(() => {
    if (userToEdit) {
      form.reset({
        fullName: userToEdit.fullName,
        email: userToEdit.email,
        role: userToEdit.role as "ADMIN" | "OFFICER",
        areaId: userToEdit.area?.id ?? "",
      });
    } else {
      form.reset();
    }
  }, [userToEdit, form]);

  useEffect(() => {
    if (open && !userToEdit) {
      form.reset({
        fullName: "",
        email: "",
        role: "OFFICER",
        areaId: "",
      });
    }
  }, [open, userToEdit, form]);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: UserFormValues) => {
    try {
      if (isEditMode) {
        await updateUser(userToEdit!.id, data);
        toast.success("Usuario actualizado correctamente");
      } else {
        await createUser(data, selectedEntity!.id);
        toast.success("Usuario creado correctamente");
        queryClient.invalidateQueries({ queryKey: [KPI_QUERY_KEY] });
      }

      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: [USER_BY_ENTITY_QUERY_KEY] });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los datos del usuario seleccionado en la entidad."
              : "Crea un nuevo usuario y asígnale su rol y área dentro de la entidad."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre completo <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Nombre y apellidos tal como aparecerán en el sistema.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Correo electrónico <RequiredDot />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="correo@dominio.com"
                      {...field}
                      disabled={isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Este correo se usará para el inicio de sesión.
                  </FormDescription>
                </FormItem>
              )}
            />

            {user?.role === "SUPER" && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rol <RequiredDot />
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userRoles.map(({ value, label }, i) => (
                          <SelectItem key={i} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <FormDescription>
                      Define el nivel de acceso y permisos del usuario.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un área" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Área o departamento al que pertenece el usuario.
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="pt-2 flex justify-end">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && <Loader className="animate-spin" />}
                {isEditMode ? "Guardar cambios" : "Crear usuario"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
