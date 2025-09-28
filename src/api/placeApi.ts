import axiosInstance from "./axiosInstance";
import { PlaceDTO } from "../types/place";

export const getPlaces = async (): Promise<PlaceDTO[]> => {
  const { data } = await axiosInstance.get("/places");
  return data;
};

export const getPlace = async (id: string): Promise<PlaceDTO> => {
  const { data } = await axiosInstance.get(`/places/${id}`);
  return data;
};

export const createPlace = async (payload: Partial<PlaceDTO> | FormData) => {
  const isForm = payload instanceof FormData;
  // Let axios/browser set the Content-Type (including boundary) when sending FormData
  const { data } = await axiosInstance.post("/places", payload as any, isForm ? {} : undefined);
  return data;
};

export const updatePlace = async (id: string, payload: Partial<PlaceDTO> | FormData) => {
  const isForm = payload instanceof FormData;
  const { data } = await axiosInstance.patch(`/places/${id}`, payload as any, isForm ? {} : undefined);
  return data;
};

export const deletePlace = async (id: string) => {
  const { data } = await axiosInstance.delete(`/places/${id}`);
  return data;
};
