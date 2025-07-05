"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

export function SubmitButton({ isLoading, isDisabled }: SubmitButtonProps) {
  return (
    <div className="pt-4">
      <Button
        type="submit"
        className="w-full"
        disabled={isDisabled}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader className="animate-spin" />
            Creando cuenta...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Crear cuenta
          </div>
        )}
      </Button>
    </div>
  );
}
