import api from "@/lib/axios";
import { EntitiesResponse, EntityType } from "@/types/entity";

export const getEntityTypes = async (): Promise<EntityType> => {
  try {
    const response = await api.get("/entity/types");
    return response.data;
  } catch (error) {
    return { types: [] };
  }
};

interface GetEntitiesByTypeParams {
  type: string;
  name?: string;
  page?: number;
  limit?: number;
}

export const getEntitiesByType = async ({
  type,
  name,
  page = 1,
  limit = 10,
}: GetEntitiesByTypeParams): Promise<EntitiesResponse> => {
  try {
    const response = await api.get("/entity", {
      params: {
        type,
        name,
        page,
        limit,
      },
    });

    const { entities, total, page: resPage, pageCount } = response.data;

    return {
      entities,
      total,
      page: resPage,
      pageCount,
    };
  } catch (error) {
    return {
      entities: [],
      page: 1,
      pageCount: 1,
      total: 0,
    };
  }
};

export const createEntity = async (formData: FormData) => {
  const response = await api.post("/entity", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateEntity = async (id: string, formData: FormData) => {
  const response = await api.patch(`/entity/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
