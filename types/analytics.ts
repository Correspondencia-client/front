export interface KpiResponse {
  totalRequests: number;
  resolvedRequests: number;
  avgResponseTime: number;
  activeUsers: number;
}

export interface AreaVolumeData {
  name: string;
  requests: number;
}

export type AreaVolumeResponse = AreaVolumeData[];

export interface StatusPieChartData {
  status: string;
  value: number;
}

export type StatusPieChartResponse = StatusPieChartData[];

export interface RequestsTrendData {
  date: string;
  requests: number;
}

export type RequestsTrendResponse = RequestsTrendData[];

export interface RecentActivityRequest {
  id: string;
  radicado: string;
  subject: string;
  content: { texto: string }; // si necesitas más propiedades, amplía aquí
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deadline: string;  // ISO date string
  assignedToId: string;
  citizenId: string;
  currentAreaId: string;
  entityId: string;
  procedureId: string; 
}

export type RecentActivityResponse = RecentActivityRequest[];

