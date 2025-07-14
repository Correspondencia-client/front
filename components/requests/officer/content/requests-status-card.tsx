"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRequestStatusStore } from "@/stores/request-status";
import { RequestStatus } from "@/types/requests";

interface RequestStatusConfig {
  status: RequestStatus;
  title: string;
  Icon: React.ElementType;
  count: number;
  headerColor: string;
  bgColor: string;
}

export function RequestsStatusCard({
  status,
  Icon,
  headerColor,
  count,
  title,
  bgColor,
}: RequestStatusConfig) {
  const { status: statusStore, setStatus } = useRequestStatusStore();

  const isSelected = statusStore === status;

  return (
    <Card
      key={status}
      className={cn(
        "cursor-pointer py-0 transition-all duration-200 hover:shadow-md",
        isSelected && `ring-2 ring-offset-2 ${bgColor}`
      )}
      onClick={() => setStatus(status)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${headerColor}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className={cn("text-sm font-medium")}>{title}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
