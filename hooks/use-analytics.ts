import { useQuery } from "@tanstack/react-query";
import {
  AREA_VOLUME_QUERY_KEY,
  KPI_QUERY_KEY,
  RECENT_ACTIVITY_QUERY_KEY,
  REQUESTS_TREND_QUERY_KEY,
  STATUS_PIE_CHART_QUERY_KEY,
} from "@/constants/queries";
import {
  getAreaVolumeData,
  getKpis,
  getRecentActivity,
  getRequestsTrend,
  getStatusPieChartData,
} from "@/utils/analytics";

export const useKpis = () => {
  return useQuery({
    queryKey: [KPI_QUERY_KEY],
    queryFn: getKpis,
  });
};

export const useAreaVolumeData = () => {
  return useQuery({
    queryKey: [AREA_VOLUME_QUERY_KEY],
    queryFn: getAreaVolumeData,
  });
};

export const useStatusPieChartData = () => {
  return useQuery({
    queryKey: [STATUS_PIE_CHART_QUERY_KEY],
    queryFn: getStatusPieChartData,
  });
};

export const useRequestsTrend = () => {
  return useQuery({
    queryKey: [REQUESTS_TREND_QUERY_KEY],
    queryFn: getRequestsTrend,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: [RECENT_ACTIVITY_QUERY_KEY],
    queryFn: getRecentActivity,
  });
};
