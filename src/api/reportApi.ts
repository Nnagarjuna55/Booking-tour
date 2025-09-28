import axiosInstance from "./axiosInstance";
import { SummaryReport, TopPlace, SlotUtilization } from "../types/report";

export const getSummaryReport = async (
  from?: string,
  to?: string
): Promise<SummaryReport> => {
  const { data } = await axiosInstance.get("/reports/summary", {
    params: { from, to },
  });
  return data;
};

export const getTopPlaces = async (
  limit = 5
): Promise<TopPlace[]> => {
  const { data } = await axiosInstance.get("/reports/top-places", {
    params: { limit },
  });
  return data;
};

export const getSlotUtilization = async (
  placeId: string
): Promise<SlotUtilization[]> => {
  const { data } = await axiosInstance.get(`/reports/utilization/${placeId}`);
  return data;
};

export const getActivePlacesCount = async (): Promise<{ count: number }> => {
  const { data } = await axiosInstance.get(`/reports/active-places`);
  return data;
};
