import React from "react";

interface EmptyEntityStateProps {
  description: string;
}

export function EmptyEntityState({ description }: EmptyEntityStateProps) {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-4">
      <img
        src="/images/areas-empty-state.svg"
        className="w-[250px] h-auto object-contain"
      />
      <div className="text-center">
        <h2 className="font-semibold text-lg">Selecciona una entidad</h2>
        <p className="text-neutral-500 max-w-xl">{description}</p>
      </div>
    </div>
  );
}
