import { Area } from "@/types/area";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  entity?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  area?: Area;
};
