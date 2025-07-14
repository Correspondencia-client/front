"use client";

import type React from "react";

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
  Clock,
  MessageSquare,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Calendar,
  Building2,
  FileText,
  Tag,
  Hash,
  Info,
  Paperclip,
  Download,
} from "lucide-react";
import { AssignedRequestItem, RequestStatus } from "@/types/requests";

interface RequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: AssignedRequestItem | null;
}

// Configuración de estados para los badges y iconos (duplicado de admin/page.tsx para auto-contención)
const estadosConfig: Record<
  RequestStatus,
  { titulo: string; badgeColor: string; icon: React.ElementType }
> = {
  pendiente: {
    titulo: "Pendiente",
    badgeColor: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
  "en-revision": {
    titulo: "En Revisión",
    badgeColor: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  "en-proceso": {
    titulo: "En Proceso",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: MessageSquare,
  },
  completada: {
    titulo: "Completada",
    badgeColor: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rechazada: {
    titulo: "Rechazada",
    badgeColor: "bg-gray-100 text-gray-800",
    icon: XCircle,
  },
};

// Función para obtener el color del badge de prioridad (duplicado para auto-contención)
const getPrioridadColor = (prioridad: "alta" | "media" | "baja") => {
  switch (prioridad) {
    case "alta":
      return "bg-red-100 text-red-800";
    case "media":
      return "bg-yellow-100 text-yellow-800";
    case "baja":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function RequestDetailModal({
  isOpen,
  onClose,
  request,
}: RequestDetailModalProps) {
  if (!request) {
    return null;
  }

  const statusConfig = estadosConfig[request.status] || {
    titulo: request.status,
    badgeColor: "bg-gray-100 text-gray-800",
    icon: Tag, // Icono por defecto
  };
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <StatusIcon className="h-7 w-7 text-primary" />{" "}
            {/* Icono más grande y color primario */}
            {request.subject}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Detalles completos de la solicitud del ciudadano{" "}
            <span className="font-semibold text-foreground">
              {request.citizen.fullName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 -mr-6">
          <div className="grid gap-6 py-4">
            {" "}
            {/* Aumentado el espacio entre secciones */}
            {/* Sección de Información General */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />{" "}
                {/* Icono y color para esta sección */}
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
                  {new Date(request.createdAt).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Actualizada:</span>{" "}
                  {new Date(request.updatedAt).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Fecha Límite:</span>{" "}
                  {new Date(request.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    Tipo de Procedimiento:
                  </span>{" "}
                  {request.procedure.name}
                </div>
              </div>
            </div>
            {/* Sección de Información del Ciudadano */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />{" "}
                {/* Icono y color para esta sección */}
                Información del Ciudadano
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Nombre Completo:</span>{" "}
                  {request.citizen.fullName}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Correo:</span>{" "}
                  {request.citizen.email}
                </div>
              </div>
            </div>
            {/* Sección de Descripción */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Descripción
              </h3>
              <div
                className="prose prose-sm max-w-none mt-2 border border-dashed border-muted-foreground bg-muted p-4 rounded-md" // Clases añadidas aquí
                dangerouslySetInnerHTML={{ __html: request.content.texto }}
              />
            </div>

            {/* Sección de Documentos Adjuntos */}
            {request.Document && request.Document.length > 0 && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                  Documentos Adjuntos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {request.Document.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Download className="h-4 w-4 text-blue-600" />
                      <span className="flex-1 truncate">{doc.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
