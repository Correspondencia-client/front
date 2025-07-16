export interface Procedure {
  id: string;
  name: string;
  description: string;
  maxResponseDays: number;
  pqrsType: string;
}

export interface GetProceduresByAreaParams {
  areaId: string;
}

export interface GetProceduresByEntityParams {
  entityId: string;
}

export interface GetProceduresByAreaResponse {
  procedures: Procedure[];
}

export interface GetProceduresByEntityResponse {
  procedures: Procedure[];
}
