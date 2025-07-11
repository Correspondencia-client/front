import api from "@/lib/axios";
import { UserFormValues } from "@/schemas/user";
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

export const createUser = async (data: UserFormValues, entityId: string) => {
  const payload = {
    fullName: data.fullName,
    email: data.email,
    role: data.role,
    entityId,
    ...(data.areaId && { areaId: data.areaId }),
  };

  const res = await api.post("/auth/register-officer", payload);
  return res.data;
};

export const updateUser = async (id: string, data: UserFormValues) => {
  const res = await api.patch(`/auth/${id}`, data);
  return res.data;
};

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/auth/${id}`);
}
