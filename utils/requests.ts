import api from "@/lib/axios";
import {
  CitizenRequestFormValues,
  ReplyRequestFormValues,
} from "@/schemas/request";
import {
  ApiAssignedRequestsResponse,
  AssignedRequestItem,
  AssignedRequestParams,
  AssignedRequestsResponse,
  RequestHistoryItem,
  RequestStatus,
} from "@/types/requests";

export type RequestsCountByStatus = Partial<Record<RequestStatus, number>>;

export async function getMyAssignedRequestsCountByStatus(): Promise<RequestsCountByStatus> {
  const response = await api.get<RequestsCountByStatus>(
    "/requests/my-assigned/count-by-status"
  );
  return response.data;
}

export async function getMyRequestsCount(): Promise<RequestsCountByStatus> {
  const response = await api.get<RequestsCountByStatus>(
    "/requests/my-requests/count-by-status"
  );

  console.log(response.data);
  return response.data;
}

export async function getMyAssignedRequests(
  params: AssignedRequestParams
): Promise<AssignedRequestsResponse> {
  try {
    const response = await api.get<ApiAssignedRequestsResponse>(
      "/requests/my-assigned",
      {
        params,
      }
    );

    const { data, page, total, limit } = response.data;

    const requests = data ?? [];

    console.log(requests);

    return {
      requests,
      total,
      page,
      limit,
    };
  } catch (error) {
    return {
      requests: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
}

export async function getMyRequests(
  params: AssignedRequestParams
): Promise<AssignedRequestsResponse> {
  try {
    const response = await api.get<ApiAssignedRequestsResponse>(
      "/requests/my-requests",
      {
        params,
      }
    );

    const { data, page, total, limit } = response.data;

    const requests = data ?? [];

    console.log(requests);

    return {
      requests,
      total,
      page,
      limit,
    };
  } catch (error) {
    return {
      requests: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
}

export async function replyToRequest(
  requestId: string,
  values: ReplyRequestFormValues
) {
  const formData = new FormData();

  // Campos de texto
  formData.append("message", values.title);
  formData.append("data", JSON.stringify({ texto: values.description }));

  // Adjuntar archivos si hay
  if (values.attachment && values.attachment.length > 0) {
    Array.from(values.attachment as File[]).forEach((file) => {
      formData.append("files", file); // mismo nombre para todos los archivos
    });
  }

  // Enviar la solicitud con Axios
  const response = await api.post(`/requests/${requestId}/reply`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const createCitizenRequest = async (data: CitizenRequestFormValues) => {
  const formData = new FormData();

  formData.append("subject", data.title);
  formData.append("procedureId", data.procedureId);
  formData.append("content", JSON.stringify({ texto: data.description }));

  // Verifica si hay archivos y los añade al formData
  if (data.attachment && data.attachment.length > 0) {
    Array.from(data.attachment as File[]).forEach((file) => {
      formData.append("files", file); // Si tu backend espera "files[]" usa "files[]"
    });
  }

  const response = await api.post("/requests", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getRequestHistory = async (
  requestId: string
): Promise<RequestHistoryItem[]> => {
  const response = await api.get(`/requests/${requestId}/history`);
  console.log("HISTORY RESPONSE", response.data);
  return response.data;
};
