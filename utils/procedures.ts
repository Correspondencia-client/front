import api from "@/lib/axios";
import { ProcedureFormValues } from "@/schemas/procedure";

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
  data: ProcedureFormValues
) => {
  return api.patch(`/procedure/${id}`, data);
};
