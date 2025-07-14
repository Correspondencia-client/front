import { useQuery } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
  REQUEST_HISTORY_QUERY_KEY,
} from "@/constants/queries";
import {
  getMyAssignedRequests,
  getMyAssignedRequestsCountByStatus,
  getRequestHistory,
} from "@/utils/requests";
import {
  AssignedRequestItem,
  AssignedRequestParams,
  RequestHistoryItem,
} from "@/types/requests";

export function useMyAssignedRequests({
  status,
  page = 1,
  limit = 10,
}: AssignedRequestParams) {
  return useQuery({
    queryKey: [MY_ASSIGNED_REQUESTS_QUERY_KEY, status, page, limit],
    queryFn: () => getMyAssignedRequests({ status, page, limit }),
    enabled: !!status,
  });
}

export function useMyAssignedRequestsCountByStatus() {
  return useQuery({
    queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
    queryFn: getMyAssignedRequestsCountByStatus,
  });
}

export const useRequestHistory = (requestId: string) => {
  return useQuery<RequestHistoryItem[]>({
    queryKey: [REQUEST_HISTORY_QUERY_KEY, requestId],
    queryFn: () => getRequestHistory(requestId),
    enabled: !!requestId,
  });
};
