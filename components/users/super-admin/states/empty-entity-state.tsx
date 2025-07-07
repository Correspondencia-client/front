import React from "react";

export function EmptyEntityState() {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-4">
      <img
        src="/images/users-empty-state.svg"
        className="w-[250px] h-auto object-contain"
      />
      <div className="text-center">
        <h2 className="font-semibold text-lg">Selecciona una entidad</h2>
        <p className="text-neutral-500">
          Selecciona un tipo de entidad y una entidad específica para ver sus
          usuarios.
        </p>
      </div>
    </div>
  );
}
