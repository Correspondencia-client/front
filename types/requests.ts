export type RequestStatus =
  | "IN_REVIEW"
  | "ASSIGNED"
  | "OVERDUE"
  | "COMPLETED"
  | "PENDING"
  | string;

export interface AssignedRequestParams {
  status: RequestStatus;
  page: number;
  limit: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  requestId: string;
  requestUpdateId: string;
}

export interface AssignedRequestItem {
  id: string;
  radicado: string;
  subject: string;
  status: RequestStatus;
  Document?: DocumentItem[];
  createdAt: string;
  updatedAt: string;
  content: {
    texto: string;
  };
  citizen: {
    id: string;
    fullName: string;
    email: string;
  };
  currentArea: {
    id: string;
    name: string;
  };
  currentAreaId: string;
  deadline: string;
  entityId: string;
  procedure: {
    id: string;
    name: string;
  };
  assignedToId: string;
}

export interface ApiAssignedRequestsResponse {
  data: AssignedRequestItem[];
  total: number;
  page: number;
  limit: number;
}

export interface AssignedRequestsResponse {
  requests: AssignedRequestItem[];
  total: number;
  page: number;
  limit: number;
}

export interface RequestHistoryUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface RequestHistoryArea {
  id: string;
  name: string;
}

export interface RequestHistoryItem {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  requestId: string;

  // Contenido enriquecido (puede ser null)
  data?: {
    texto: string;
  } | null;

  // Documentos adjuntos
  Document?: DocumentItem[];
  documents: DocumentItem[];

  // Usuario que hizo la acción
  updatedBy: RequestHistoryUser;

  // Áreas involucradas
  fromArea?: RequestHistoryArea | null;
  toArea?: RequestHistoryArea | null;

  fromAreaId?: string | null;
  toAreaId?: string | null;

  updatedById: string;

  createdBy?: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface AssignAreaPayload {
  toAreaId: string;
  message: string;
}

export type ExternalRequest = {
  id: string;
  radicado: string;
  typeRequest: string;
  recipient: string;
  mailrecipient: string;
  maxResponseDays: number;
  subject: string;
  content: {
    texto: string;
  };
  status: RequestStatus; // Puedes ajustar los estados válidos
  entityId: string;
  userId: string;
  deadline: string; // o Date si lo conviertes
  createdAt: string; // o Date
  updatedAt: string; // o Date
};

export type ExternalRequestsResponse = {
  requests: ExternalRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiExternalRequestsResponse = {
  data: ExternalRequest[];
  meta: {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface GetExternalRequestsParams {
  page: number;
  limit: number;
  status: string;
  subject?: string;
  radicado?: string;
}
