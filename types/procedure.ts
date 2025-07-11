export interface Procedure {
  id: string;
  name: string;
  description: string;
  maxResponseDays: number;
}

export interface GetProceduresByAreaParams {
  areaId: string;
}

export interface GetProceduresByAreaResponse {
  procedures: Procedure[];
}
