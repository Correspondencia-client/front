export interface Area {
  id: string
  name: string
}

export interface GetAreasByEntityParams {
  entityId: string;
  name?: string;
  page?: number;
  limit?: number;
}

export interface GetAreasByEntityResponse {
  areas: Area[];
  total: number;
  page: number;
  limit: number;
}