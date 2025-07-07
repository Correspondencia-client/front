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
}

export interface EntitiesResponse {
  entities: Entity[];
  total: number;
  page: number;
  pageCount: number;
}