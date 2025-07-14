import { RequestHistoryItem } from "@/types/requests";
import { HistoryItem } from "@/components/requests/history/sidebar/history-item";
import { SkeletonEntityList } from "@/components/users/super-admin/skeletons/skeleton-entity-list";

interface HistoryListProps {
  isLoadingHistory: boolean;
  requests: RequestHistoryItem[];
}

export function HistoryList({ isLoadingHistory, requests }: HistoryListProps) {
  const skeletonCount = 5;

  return (
    <>
      {isLoadingHistory ? (
        <div className="overflow-y-auto">
          <SkeletonEntityList count={skeletonCount} />
        </div>
      ) : (
        <div className="overflow-y-auto h-full">
          <div className="bg-white h-full flex flex-col p-0.5 gap-2">
            {requests?.map((request) => (
              <HistoryItem key={request.id} history={request} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
