import {
  ENTITIES_QUERY_KEY,
  ENTITY_TYPES_QUERY_KEY,
} from "@/constants/queries";
import { getEntitiesByType, getEntityTypes } from "@/utils/entities";
import { useQuery } from "@tanstack/react-query";

export const useEntityTypes = () => {
  return useQuery({
    queryKey: [ENTITY_TYPES_QUERY_KEY],
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
    queryKey: [ENTITIES_QUERY_KEY, params],
    queryFn: () => getEntitiesByType(params),
    enabled: !!params.type,
  });
};
