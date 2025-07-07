"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useEntitySelection } from "@/stores/entity-selection";
import { Building2, Check, ChevronsUpDown } from "lucide-react";

interface EntityTypeSelectProps {
  entityTypes: string[];
}

export function EntityTypeSelect({ entityTypes }: EntityTypeSelectProps) {
  const { selectedEntityType, setEntityType } = useEntitySelection();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border bg-sidebar-accent h-16">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Building2 className="size-4" />
          </div>
          <div className="flex flex-col gap-1 leading-none">
            <span className="font-medium">Tipo de entidad</span>
            <span className="">{selectedEntityType}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width)"
        align="start"
      >
        {entityTypes.map((type, i) => (
          <DropdownMenuItem key={i} onSelect={() => setEntityType(type)}>
            {type}
            {type === selectedEntityType && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
