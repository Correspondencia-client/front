import { getUsersByEntity } from "@/utils/users";
import { useQuery } from "@tanstack/react-query";

export function useUsersByEntity(
  params: Parameters<typeof getUsersByEntity>[0]
) {
  return useQuery({
    queryKey: ["users-by-entity", params],
    queryFn: () => getUsersByEntity(params),
    enabled: !!params.entityId,
  });
}
