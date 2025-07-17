import api from "@/lib/axios";
import { ProcedureFormValues } from "@/schemas/procedure";
import {
  GetProceduresByAreaParams,
  GetProceduresByAreaResponse,
  GetProceduresByEntityParams,
  GetProceduresByEntityResponse,
} from "@/types/procedure";
import { AxiosError } from "axios";

export async function getProceduresByArea(
  params: GetProceduresByAreaParams
): Promise<GetProceduresByAreaResponse> {
  try {
    const response = await api.get(`/procedure/by-area/${params.areaId}`, {
      params,
    });

    return {
      procedures: response.data ?? [],
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      procedures: [],
    };
  }
}

export async function getProceduresByEntity(
  params: GetProceduresByEntityParams
): Promise<GetProceduresByEntityResponse> {
  try {
    const response = await api.get(`/procedure/${params.entityId}`, {
      params,
    });

    return {
      procedures: response.data ?? [],
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      procedures: [],
    };
  }
}

export const createProcedure = async (
  data: ProcedureFormValues,
  entityId: string,
  areaId: string
) => {
  return api.post("/procedure", {
    ...data,
    maxResponseDays: Number(data.maxResponseDays),
    entityId,
    areaId,
  });
};

export const updateProcedure = async (
  id: string,
  areaId: string,
  data: ProcedureFormValues
) => {
  console.log({ id, areaId, ...data });
  return api.patch(`/procedure/${id}`, {
    ...data,
    areaId,
    maxResponseDays: Number(data.maxResponseDays),
  });
};

export async function deleteProcedure(id: string): Promise<void> {
  await api.delete(`/procedure/${id}`);
}
