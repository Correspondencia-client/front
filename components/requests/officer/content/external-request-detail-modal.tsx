"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Calendar,
  Clock,
  Mail,
  Tag,
  User,
  FileText,
  Info,
} from "lucide-react";
import { ExternalRequest } from "@/types/requests";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ExternalRequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ExternalRequest | null;
}

const estadosConfig = {
  PENDING: {
    titulo: "Pendiente",
    badgeColor: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle,
  },
  IN_REVIEW: {
    titulo: "En Revisión",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: Clock,
  },
  COMPLETED: {
    titulo: "Completada",
    badgeColor: "bg-green-100 text-green-800",
    icon: Tag,
  },
  REJECTED: {
    titulo: "Rechazada",
    badgeColor: "bg-red-100 text-red-800",
    icon: Tag,
  },
};

export function ExternalRequestDetailModal({
  isOpen,
  onClose,
  request,
}: ExternalRequestDetailModalProps) {
  if (!request) return null;

  const statusConfig = estadosConfig[
    request.status as keyof typeof estadosConfig
  ] ?? {
    titulo: "Desconocido",
    badgeColor: "bg-gray-100 text-gray-800",
    icon: Tag,
  };

  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <StatusIcon className="h-7 w-7 text-primary" />
            {request.subject}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Detalles completos de la solicitud externa con radicado{" "}
            <span className="font-semibold text-foreground">
              {request.radicado}
            </span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 -mr-6">
          <div className="grid gap-6 py-4">
            {/* Información General */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Información General
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Estado:</span>
                  <Badge className={statusConfig.badgeColor}>
                    {statusConfig.titulo}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Creada:</span>{" "}
                  {format(new Date(request.createdAt), "dd/MM/yyyy HH:mm", {
                    locale: es,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Fecha límite:</span>{" "}
                  {format(new Date(request.deadline), "dd/MM/yyyy", {
                    locale: es,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tipo:</span>{" "}
                  {request.typeRequest}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Correo destinatario:</span>{" "}
                  {request.mailrecipient}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Descripción
              </h3>
              <div
                className="prose prose-sm max-w-none mt-2 border border-dashed border-muted-foreground bg-muted p-4 rounded-md"
                dangerouslySetInnerHTML={{ __html: request.content.texto }}
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
