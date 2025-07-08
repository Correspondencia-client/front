import { Area } from "@/types/area";

export interface User {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  isEmailVerified: boolean;
  role: string;
  area: Area;
}

export interface GetUsersByEntityParams {
  entityId?: string;
  isEmailVerified?: "true" | "false";
  active?: "true" | "false";
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetUsersByEntityResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
