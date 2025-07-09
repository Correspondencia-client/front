import api from "@/lib/axios";
import { AreaFormValues } from "@/schemas/area";
import { GetAreasByEntityParams, GetAreasByEntityResponse } from "@/types/area";
import { AxiosError } from "axios";

export async function getAreasByEntity(
  params: GetAreasByEntityParams
): Promise<GetAreasByEntityResponse> {
  try {
    const response = await api.get("/area", {
      params,
    });

    const { data: areas, total, page, limit } = response.data;

    return {
      areas: areas ?? [],
      total: total ?? 0,
      page: page ?? 1,
      limit: limit ?? 10,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error al obtener áreas:", err);

    return {
      areas: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
}

export const createArea = async (data: AreaFormValues, entityId: string) => {
  const res = await api.post("/area", { ...data, entityId });
  return res.data;
};

export const updateArea = async (id: string, data: AreaFormValues) => {
  const res = await api.patch(`/area/${id}`, { id, name: data.name });
  return res.data;
};

export async function deleteArea(id: string): Promise<void> {
  await api.delete(`/area/${id}`);
}
