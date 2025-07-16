import { useQuery } from "@tanstack/react-query";
import { PROCEDURES_QUERY_KEY } from "@/constants/queries";
import { getProceduresByArea, getProceduresByEntity } from "@/utils/procedures";

export function useProceduresByArea(
  params: Parameters<typeof getProceduresByArea>[0]
) {
  return useQuery({
    queryKey: [PROCEDURES_QUERY_KEY, params],
    queryFn: () => getProceduresByArea(params),
    enabled: !!params.areaId,
  });
}

export function useProceduresByEntity(
  params: Parameters<typeof getProceduresByEntity>[0]
) {
  return useQuery({
    queryKey: [PROCEDURES_QUERY_KEY, params],
    queryFn: () => getProceduresByEntity(params),
    enabled: !!params.entityId,
  });
}
