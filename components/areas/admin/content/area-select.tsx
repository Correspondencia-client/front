"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAreaSelection } from "@/stores/area-selection";
import { Building, Check, ChevronsUpDown } from "lucide-react";
import type { Area } from "@/types/area";

interface AreaSelectProps {
  areas: Area[];
}

export function AreaSelect({ areas }: AreaSelectProps) {
  const { selectedArea, setArea } = useAreaSelection();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border bg-sidebar-accent h-16">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Building className="size-4" />
          </div>
          <div className="flex flex-col gap-1 leading-none">
            <span className="font-medium">Área seleccionada</span>
            <span className="">{selectedArea?.name || "Seleccionar área"}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width]"
        align="start"
      >
        {areas.map((area) => (
          <DropdownMenuItem key={area.id} onSelect={() => setArea(area)}>
            {area.name}
            {area.id === selectedArea?.id && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
