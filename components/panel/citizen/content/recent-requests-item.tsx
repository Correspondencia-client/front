import { AssignedRequestItem } from "@/types/requests";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import { FileText } from "lucide-react";
import Link from "next/link";

interface RecentRequestsItemProps {
  request: AssignedRequestItem;
}

export function RecentRequestsItem({ request }: RecentRequestsItemProps) {
  return (
    <Link
      href={`/solicitudes/historial/${request.id}`}
      className="flex items-center space-x-4 hover:bg-muted py-2 hover:px-2 rounded-md transition-all"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        <FileText className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{request.subject}</p>
        <p className="text-sm text-muted-foreground">
          {request.currentArea.name}
        </p>
      </div>
      <div className="text-sm text-muted-foreground">
        {formatDistanceToNowStrict(new Date(request.createdAt), {
          addSuffix: true,
          locale: es,
        })}
      </div>
    </Link>
  );
}
