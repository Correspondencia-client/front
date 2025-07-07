"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchTerm: string;
  placeholder?: string
  onSearch: (searchTerm: string) => void;
}

export function SearchInput({ placeholder, searchTerm, onSearch }: SearchInputProps) {
  return (
    <div className="relative space-y-2">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder ?? "Buscar por nombre..."}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10 bg-white"
      />
    </div>
  );
}
