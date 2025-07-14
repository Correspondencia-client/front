import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  isMyResponse?: boolean;
}

export function RequestHistoryItemSkeleton({ isMyResponse }: Props) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden max-sm:py-10",
        isMyResponse && "border-2 border-blue-500 shadow-md"
      )}
    >
      {isMyResponse && (
        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
          Tu respuesta
        </Badge>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-52" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2 col-span-full">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
