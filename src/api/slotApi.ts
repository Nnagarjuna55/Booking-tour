import axiosInstance from "./axiosInstance";
import { SlotDTO } from "../types/slot";

export const getSlotsByPlace = async (placeId: string): Promise<SlotDTO[]> => {
  const { data } = await axiosInstance.get(`/slots/${placeId}`);
  return data;
};

export const createSlot = async (payload: Partial<SlotDTO>) => {
  const { data } = await axiosInstance.post("/slots", payload);
  return data;
};

export const updateSlot = async (id: string, payload: Partial<SlotDTO>) => {
  const { data } = await axiosInstance.patch(`/slots/${id}`, payload);
  return data;
};

export const cancelSlot = async (id: string) => {
  const { data } = await axiosInstance.post(`/slots/${id}/cancel`);
  return data;
};
