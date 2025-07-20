import api from "@/lib/axios";
import {
  AreaVolumeResponse,
  KpiResponse,
  RecentActivityResponse,
  RequestsTrendResponse,
  StatusPieChartResponse,
} from "@/types/analytics";

export const getKpis = async (): Promise<KpiResponse> => {
  const response = await api.get<any>("/analitys/kpis");
  return response.data;
};

export const getAreaVolumeData = async (): Promise<AreaVolumeResponse> => {
  const response = await api.get<AreaVolumeResponse>("/analitys/area-chart");
  return response.data;
};

export const getStatusPieChartData =
  async (): Promise<StatusPieChartResponse> => {
    const response = await api.get<StatusPieChartResponse>(
      "/analitys/requests-by-status"
    );
    return response.data;
  };

export const getRequestsTrend = async (): Promise<RequestsTrendResponse> => {
  const response = await api.get<RequestsTrendResponse>(
    "/analitys/requests-trend"
  );
  return response.data;
};

export const getRecentActivity = async (): Promise<RecentActivityResponse> => {
  const response = await api.get<RecentActivityResponse>(
    "/analitys/latest-requests"
  );
  console.log(response.data)
  return response.data;
};
