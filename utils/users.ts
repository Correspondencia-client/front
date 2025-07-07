import api from "@/lib/axios";
import { GetUsersByEntityParams, GetUsersByEntityResponse } from "@/types/user";

export async function getUsersByEntity(
  params: GetUsersByEntityParams
): Promise<GetUsersByEntityResponse> {
  try {
    const response = await api.get("/user/by-entity", { params });

    const { entities, total, page, limit } = response.data;

    const users = entities?.[0]?.users ?? [];

    return {
      users,
      total,
      page,
      limit,
    };
  } catch (error) {
    return {
      users: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
}
