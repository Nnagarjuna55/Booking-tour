import axiosInstance from "./axiosInstance";
import { ClientDTO } from "../types/client";

export const getClients = async (): Promise<ClientDTO[]> => {
  const { data } = await axiosInstance.get("/clients");
  return data;
};

export const getClient = async (id: string): Promise<ClientDTO> => {
  const { data } = await axiosInstance.get(`/clients/${id}`);
  return data;
};

export const createClient = async (payload: Partial<ClientDTO>) => {
  const { data } = await axiosInstance.post("/clients", payload);
  return data;
};

export const updateClient = async (id: string, payload: Partial<ClientDTO>) => {
  const { data } = await axiosInstance.patch(`/clients/${id}`, payload);
  return data;
};
