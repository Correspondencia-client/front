"use client";

import Image from "next/image";
import { Entity } from "@/types/entity";
import { Button } from "@/components/ui/button";
import { useEntitySelection } from "@/stores/entity-selection";

interface EntityItemProps {
  entity: Entity;
}

export function EntityItem({ entity }: EntityItemProps) {
  const { selectedEntity, setEntity } = useEntitySelection();

  return (
    <Button
      variant={selectedEntity?.id === entity.id ? "default" : "ghost"}
      onClick={() => setEntity(entity)}
      className="h-14"
    >
      <div className="flex items-center gap-3 w-full">
        <Image
          src={entity.imgUrl}
          alt={entity.name}
          width={32}
          height={32}
          className="size-10 bg-muted rounded-md object-cover flex-shrink-0"
          unoptimized
        />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <p className="truncate text-wrap font-medium">{entity.name}</p>
        </div>
      </div>
    </Button>
  );
}
