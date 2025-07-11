import { useQuery } from "@tanstack/react-query";
import { PROCEDURES_QUERY_KEY } from "@/constants/queries";
import { getProceduresByArea } from "@/utils/procedures";

export function useProceduresByArea(
  params: Parameters<typeof getProceduresByArea>[0]
) {
  return useQuery({
    queryKey: [PROCEDURES_QUERY_KEY, params],
    queryFn: () => getProceduresByArea(params),
    enabled: !!params.areaId,
  });
}
