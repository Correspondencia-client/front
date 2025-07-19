"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AssignedRequestItem, ExternalRequest } from "@/types/requests";
import { Loader } from "lucide-react";

interface CompleteExternalRequestDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  request: ExternalRequest | null;
  onConfirm: (request: ExternalRequest) => void;
}

export function CompleteExternalRequestDialog({
  isOpen,
  onClose,
  isLoading,
  request,
  onConfirm,
}: CompleteExternalRequestDialogProps) {
  if (!request) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Marcar solicitud como completada</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de completar la solicitud{" "}
            <strong>"{request.subject}"</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => {
              onConfirm(request);
              onClose();
            }}
          >
            {isLoading && <Loader className="animate-spin" />}
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
