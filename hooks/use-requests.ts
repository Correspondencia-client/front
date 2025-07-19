import { useQuery } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
  MY_REQUESTS_COUNT_QUERY_KEY,
  MY_REQUESTS_EXTERNAL_QUERY_KEY,
  MY_REQUESTS_QUERY_KEY,
  REQUEST_HISTORY_QUERY_KEY,
} from "@/constants/queries";
import {
  getExternalRequests,
  getMyAssignedRequests,
  getMyAssignedRequestsCountByStatus,
  getMyRequests,
  getMyRequestsCount,
  getRequestHistory,
  RequestsCountByStatus,
} from "@/utils/requests";
import { AssignedRequestParams, RequestHistoryItem } from "@/types/requests";

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

export function useMyRequests({
  status,
  page = 1,
  limit = 10,
}: AssignedRequestParams) {
  return useQuery({
    queryKey: [MY_REQUESTS_QUERY_KEY, status, page, limit],
    queryFn: () => getMyRequests({ status, page, limit }),
    enabled: !!status,
  });
}

export function useMyExternalRequests({
  status,
  page = 1,
  limit = 10,
}: AssignedRequestParams) {
  return useQuery({
    queryKey: [MY_REQUESTS_EXTERNAL_QUERY_KEY, status, page, limit],
    queryFn: () => getExternalRequests(),
    enabled: !!status,
  });
}

export function useMyAssignedRequestsCountByStatus() {
  return useQuery({
    queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
    queryFn: getMyAssignedRequestsCountByStatus,
  });
}

export function useMyRequestsCount() {
  return useQuery<RequestsCountByStatus>({
    queryKey: [MY_REQUESTS_COUNT_QUERY_KEY],
    queryFn: getMyRequestsCount,
  });
}

export const useRequestHistory = (requestId: string) => {
  return useQuery<RequestHistoryItem[]>({
    queryKey: [REQUEST_HISTORY_QUERY_KEY, requestId],
    queryFn: () => getRequestHistory(requestId),
    enabled: !!requestId,
  });
};
