import { useQuery } from "@tanstack/react-query";
import { AREAS_QUERY_KEY } from "@/constants/queries";
import { getAreasByEntity } from "@/utils/areas";

export function useAreasByEntity(
  params: Parameters<typeof getAreasByEntity>[0]
) {
  return useQuery({
    queryKey: [AREAS_QUERY_KEY, params],
    queryFn: () => getAreasByEntity(params),
    enabled: !!params.entityId,
  });
}
