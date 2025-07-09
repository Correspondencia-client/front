"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Entity } from "@/types/entity";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Building2, Phone, CalendarDays, Activity, Hash } from "lucide-react";

interface EntityViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entity: Entity | null;
}

export function EntityViewDialog({
  open,
  onOpenChange,
  entity,
}: EntityViewDialogProps) {
  if (!entity) return null;

  const infoItems = [
    {
      icon: Building2,
      label: "Tipo",
      value: <Badge variant="outline">{entity.type}</Badge>,
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: <span className="font-medium">{entity.phone}</span>,
    },
    {
      icon: CalendarDays,
      label: "Creado",
      value: <span>{format(new Date(entity.createdAt), "dd/MM/yyyy")}</span>,
    },
    {
      icon: Activity,
      label: "Estado",
      value: (
        <Badge variant={entity.active ? "default" : "destructive"}>
          {entity.active ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      icon: Hash,
      label: "Áreas",
      value: <span className="font-bold text-lg">{entity.areas.length}</span>,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles de entidad</DialogTitle>
          <DialogDescription>
            Información resumida de la entidad
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Header con imagen y nombre */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <img
              src={entity.imgUrl || "/placeholder.svg"}
              alt={`Imagen de ${entity.name}`}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-1">
                {entity.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {entity.description}
              </p>
            </div>
          </div>

          {/* Lista compacta de información */}
          <div className="space-y-3">
            {infoItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
