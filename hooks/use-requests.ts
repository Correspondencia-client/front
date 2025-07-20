import { useQuery } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
  MY_REQUESTS_COUNT_QUERY_KEY,
  MY_REQUESTS_EXTERNAL_QUERY_KEY,
  MY_REQUESTS_QUERY_KEY,
  REQUEST_HISTORY_QUERY_KEY,
  UNIFIED_REQUESTS_QUERY_KEY,
} from "@/constants/queries";
import {
  getExternalRequests,
  getMyAssignedRequests,
  getMyAssignedRequestsCountByStatus,
  getMyRequests,
  getMyRequestsCount,
  getRequestHistory,
  getUnifiedReports,
  RequestsCountByStatus,
} from "@/utils/requests";
import {
  AssignedRequestParams,
  GetExternalRequestsParams,
  GetUnifiedReportsParams,
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

export function useMyExternalRequests(params: GetExternalRequestsParams) {
  return useQuery({
    queryKey: [MY_REQUESTS_EXTERNAL_QUERY_KEY, params],
    queryFn: () => getExternalRequests(params),
    enabled: !!params.status,
  });
}

// Hook condicional para oficiales - acepta parámetro enabled
export function useMyAssignedRequestsCountByStatus({
  enabled = true,
}: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: [MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY],
    queryFn: getMyAssignedRequestsCountByStatus,
    enabled,
  });
}

// Hook condicional para ciudadanos - acepta parámetro enabled
export function useMyRequestsCount({
  enabled = true,
}: { enabled?: boolean } = {}) {
  return useQuery<RequestsCountByStatus>({
    queryKey: [MY_REQUESTS_COUNT_QUERY_KEY],
    queryFn: getMyRequestsCount,
    enabled,
  });
}

export const useRequestHistory = (requestId: string) => {
  return useQuery<RequestHistoryItem[]>({
    queryKey: [REQUEST_HISTORY_QUERY_KEY, requestId],
    queryFn: () => getRequestHistory(requestId),
    enabled: !!requestId,
  });
};

export function useUnifiedReports(params: GetUnifiedReportsParams) {
  return useQuery({
    queryKey: [UNIFIED_REQUESTS_QUERY_KEY, params],
    queryFn: () => getUnifiedReports(params),
    enabled: true,
  });
}
