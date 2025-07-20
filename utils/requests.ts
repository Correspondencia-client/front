import api from "@/lib/axios";
import {
  AdminRequestFormValues,
  CitizenRequestFormValues,
  ReplyRequestFormValues,
} from "@/schemas/request";
import {
  ApiAssignedRequestsResponse,
  ApiExternalRequestsResponse,
  AssignAreaPayload,
  AssignedRequestParams,
  AssignedRequestsResponse,
  ExternalRequestsResponse,
  GetExternalRequestsParams,
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

export const createExternalRequest = async (
  values: AdminRequestFormValues,
  entityId: string
) => {
  const formData = new FormData();

  // Añadir campos de texto al FormData
  formData.append("subject", values.title);
  formData.append("content", JSON.stringify({ texto: values.description }));
  formData.append("recipient", values.recipientName);
  formData.append("mailrecipient", values.recipientEmail);
  formData.append("typeRequest", values.requestType);
  formData.append("maxResponseDays", values.maxResponseDays);
  formData.append("entityId", entityId);

  // Añadir archivos adjuntos si existen
  if (values.attachment && values.attachment.length > 0) {
    for (let i = 0; i < values.attachment.length; i++) {
      formData.append("attachments", values.attachment[i]);
    }
  }

  const { data } = await api.post("/request-external", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// export const getExternalRequests =
//   async (): Promise<ExternalRequestsResponse> => {
//     try {
//       const response = await api.get<ApiExternalRequestsResponse>(
//         "/request-external"
//       );

//       const {
//         data,
//         meta: { totalItems, page, limit, totalPages },
//       } = response.data;

//       return {
//         requests: data ?? [],
//         total: totalItems,
//         page,
//         limit,
//         totalPages,
//       };
//     } catch (error) {
//       return {
//         requests: [],
//         total: 0,
//         page: 1,
//         limit: 10,
//         totalPages: 1,
//       };
//     }
//   };

export const getExternalRequests = async ({
  page,
  limit,
  status,
  subject = "",
  radicado = "",
}: GetExternalRequestsParams): Promise<ExternalRequestsResponse> => {
  try {
    const response = await api.get<ApiExternalRequestsResponse>(
      "/request-external",
      {
        params: {
          page,
          limit,
          status,
          subject,
          radicado,
        },
      }
    );

    console.log(response.data)

    const {
      data,
      meta: { totalItems, page: currentPage, limit: currentLimit, totalPages },
    } = response.data;

    return {
      requests: data ?? [],
      total: totalItems,
      page: currentPage,
      limit: currentLimit,
      totalPages,
    };
  } catch (error) {
    console.log(error)
    return {
      requests: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
};

export const getRequestHistory = async (
  requestId: string
): Promise<RequestHistoryItem[]> => {
  const response = await api.get(`/requests/${requestId}/history`);
  return response.data;
};

export async function assignRequestToArea(
  requestId: string,
  payload: AssignAreaPayload
) {
  const response = await api.patch(
    `/requests/${requestId}/assign-area`,
    payload
  );
  return response.data;
}
