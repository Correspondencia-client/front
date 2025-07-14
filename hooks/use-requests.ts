import { useQuery } from "@tanstack/react-query";
import {
  MY_ASSIGNED_REQUESTS_COUNT_BY_STATUS_QUERY_KEY,
  MY_ASSIGNED_REQUESTS_QUERY_KEY,
} from "@/constants/queries";
import {
  getMyAssignedRequests,
  getMyAssignedRequestsCountByStatus,
} from "@/utils/requests";
import { AssignedRequestParams } from "@/types/requests";

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
