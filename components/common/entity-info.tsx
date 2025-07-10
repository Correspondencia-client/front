"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEntitySelection } from "@/stores/entity-selection";
import { Building2, Calendar, Phone } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface EntityInfoProps {
  className?: string;
}

export function EntityInfo({ className }: EntityInfoProps) {
  const { selectedEntity } = useEntitySelection();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex flex-row md:flex-col md:items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
            {selectedEntity?.imgUrl ? (
              <Image
                src={selectedEntity.imgUrl}
                alt={selectedEntity.name}
                fill
                className="object-cover"
              />
            ) : (
              <Skeleton className="h-full w-full rounded-lg" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl truncate text-wrap">
                {selectedEntity?.name}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{selectedEntity?.type}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {selectedEntity?.description && (
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedEntity?.description}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t">
        <div className="grid gap-3">
          {selectedEntity?.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{selectedEntity.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Creada el {formatDate(selectedEntity?.createdAt!)}</span>
          </div>

          {/* {entity.areas && entity.areas.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Áreas ({entity.areas.length})</span>
              </div>
              <div className="flex flex-wrap gap-1 ml-6">
                {entity.areas.map((area) => (
                  <Badge key={area.id} variant="outline" className="text-xs">
                    {area.name}
                  </Badge>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </CardFooter>
    </Card>
  );
}
