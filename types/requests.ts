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
