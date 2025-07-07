import { getEntitiesByType, getEntityTypes } from "@/utils/entities";
import { useQuery } from "@tanstack/react-query";

export const useEntityTypes = () => {
  return useQuery({
    queryKey: ["entityTypes"],
    queryFn: () => getEntityTypes(),
  });
};

export const useEntities = (params: {
  type: string;
  name?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["entities", params],
    queryFn: () => getEntitiesByType(params),
    enabled: !!params.type,
  });
};
