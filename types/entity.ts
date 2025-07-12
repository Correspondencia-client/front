import { Area } from "@/types/area";
import { Procedure } from "./procedure";

export interface EntityType {
  types: string[];
}

export interface Entity {
  id: string;
  name: string;
  type: string;
  imgUrl: string;
  active: boolean;
  description: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  areas: Area[];
  procedures?: Procedure[]
}

export interface EntitiesResponse {
  entities: Entity[];
  total: number;
  page: number;
  pageCount: number;
}
