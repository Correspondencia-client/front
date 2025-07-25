"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { RequestHistoryItem as RequestHistoryItemType } from "@/types/requests";
import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  Download,
  FileText,
  Mail,
  Paperclip,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

interface RequestHistoryItemProps {
  type: "Desktop" | "Mobile";
  item: RequestHistoryItemType;
}

export function RequestHistoryItem({
  type,
  item,
}:
RequestHistoryItemProps) {
  const { user } = useAuthStore();
  const isMyResponse = item?.updatedBy?.email === user?.email;

  const getDocuments = (itemValue: RequestHistoryItemType) => {
    return itemValue.Document || itemValue.documents || [];
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden max-sm:py-10 border gap-4",
        item.message === "Solicitud Asignada al Funcionario." && "hidden"
      )}
    >
      {isMyResponse && (
        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
          Tu respuesta
        </Badge>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0">
        <div className="flex items-center gap-2">
          {isMyResponse ? (
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
          <h3 className="text-lg font-semibold uppercase">{item.message}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isMyResponse && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{item.createdBy?.fullName}</span>
            </div>
            <div className="flex items-center gap-2 col-span-full">
              <Mail className="h-4 w-4" />
              <span>{item.createdBy?.email}</span>
            </div>
          </div>
        )}
        {isMyResponse &&
          (user?.role === "ADMIN" || user?.role === "OFFICER") && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{item?.updatedBy?.fullName}</span>
              </div>
              <div className="flex items-center gap-2 col-span-full">
                <Mail className="h-4 w-4" />
                <span>{item.updatedBy.email}</span>
              </div>
            </div>
          )}

        {item.data?.texto && (
          <div className={cn("mt-4", type === "Desktop" ? "block" : "hidden")}>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-600" />
              Detalles:
            </h4>
            <div
              className="prose prose-sm max-w-none border border-dashed border-muted-foreground bg-muted p-4 rounded-md"
              dangerouslySetInnerHTML={{ __html: item.data.texto }}
            />
          </div>
        )}

        {getDocuments(item).length > 0 && (
          <div className={cn("mt-4", type === "Desktop" ? "block" : "hidden")}>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <Paperclip className="h-4 w-4 text-gray-600" />
              Documentos Adjuntos:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getDocuments(item).map((doc) => (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={doc.id}
                  className="flex items-center gap-2 p-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                >
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="flex-1 truncate">{doc.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <motion.div
          key="expand"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={cn(
            "overflow-hidden mt-4 space-y-4",
            type === "Mobile" ? "block" : "hidden"
          )}
        >
          {item.data?.texto && (
            <div>
              <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                Detalles:
              </h4>
              <div
                className="prose prose-sm max-w-none border border-dashed border-muted-foreground bg-muted p-4 rounded-md"
                dangerouslySetInnerHTML={{ __html: item.data.texto }}
              />
            </div>
          )}

          {getDocuments(item).length > 0 && (
            <div className={cn("mt-4")}>
              <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-gray-600" />
                Documentos Adjuntos:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {getDocuments(item).map((doc) => (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={doc.id}
                    className="flex items-center gap-2 p-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4 text-blue-600" />
                    <span className="flex-1 truncate">{doc.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {item.type === "TRANSFERRED" && (
          <div className="mt-4">
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-purple-600" />
              Detalles de Transferencia:
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>De: {item.fromArea?.name || "N/A"}</span>
              <ArrowRight className="h-4 w-4" />
              <span>A: {item.toArea?.name || "N/A"}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
