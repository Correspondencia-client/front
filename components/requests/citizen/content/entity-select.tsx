"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useEntitySelection } from "@/stores/entity-selection";
import { Entity } from "@/types/entity";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";

interface EntitySelectProps {
  entities: Entity[];
}

export function EntitySelect({ entities }: EntitySelectProps) {
  const { selectedEntity, setEntity } = useEntitySelection();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton disabled={entities.length === 0} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border bg-sidebar-accent h-16 space-x-2">
          {!selectedEntity && (
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Building2 className="size-4" />
            </div>
          )}
          {selectedEntity && (
            <Image
              src={selectedEntity.imgUrl}
              alt={selectedEntity.name}
              width={32}
              height={32}
              className="size-10 bg-muted rounded-md object-cover flex-shrink-0"
              unoptimized
            />
          )}
          <div className="flex flex-col gap-2 leading-none">
            <span className="font-medium">Entidad específica</span>
            <span className="">{selectedEntity?.name}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width)"
        align="start"
      >
        {entities.map((entity, i) => (
          <DropdownMenuItem key={i} onSelect={() => setEntity(entity)}>
            <Image
              src={entity.imgUrl}
              alt={entity.name}
              width={32}
              height={32}
              className="size-10 bg-muted rounded-md object-cover flex-shrink-0"
              unoptimized
            />
            {entity.name}
            {entity.id === selectedEntity?.id && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
