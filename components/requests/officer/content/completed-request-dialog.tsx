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
import { AssignedRequestItem } from "@/types/requests";
import { Loader } from "lucide-react";

interface CompleteRequestDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  request: AssignedRequestItem | null;
  onConfirm: (request: AssignedRequestItem) => void;
}

export function CompleteRequestDialog({
  isOpen,
  onClose,
  isLoading,
  request,
  onConfirm,
}: CompleteRequestDialogProps) {
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
