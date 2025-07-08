import { getUsersByEntity } from "@/utils/users";
import { useQuery } from "@tanstack/react-query";
import { USER_BY_ENTITY_QUERY_KEY } from "@/constants/queries";

export function useUsersByEntity(
  params: Parameters<typeof getUsersByEntity>[0]
) {
  return useQuery({
    queryKey: [USER_BY_ENTITY_QUERY_KEY, params],
    queryFn: () => getUsersByEntity(params),
    enabled: !!params.entityId,
  });
}
