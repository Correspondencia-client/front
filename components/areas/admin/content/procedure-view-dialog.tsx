// components/areas/admin/content/procedure-view-dialog.tsx
"use client";

import { Procedure } from "@/types/procedure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ProcedureViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  procedure: Procedure | null;
}

export function ProcedureViewDialog({
  open,
  onOpenChange,
  procedure,
}: ProcedureViewDialogProps) {
  if (!procedure) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{procedure.name}</DialogTitle>
          <DialogDescription>
            Detalles del proceso
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Descripción
            </h4>
            <p className="text-sm">{procedure.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground">
              Días máx. de respuesta
            </h4>
            <Badge variant="outline" className="text-sm">
              {procedure.maxResponseDays} días
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
