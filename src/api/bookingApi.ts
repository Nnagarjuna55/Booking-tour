import axiosInstance from "./axiosInstance";
import { BookingDTO } from "../types/booking";

export const getBookings = async (): Promise<BookingDTO[]> => {
  const { data } = await axiosInstance.get("/bookings");
  return data;
};

export const createBooking = async (payload: Partial<BookingDTO>) => {
  const { data } = await axiosInstance.post("/bookings", payload);
  return data;
};

export const cancelBooking = async (id: string) => {
  const { data } = await axiosInstance.post(`/bookings/${id}/cancel`);
  return data;
};

export const rescheduleBooking = async (id: string, newSlotId: string) => {
  const { data } = await axiosInstance.post(`/bookings/${id}/reschedule`, {
    newSlotId,
  });
  return data;
};

export const getBookingsByClient = async (clientId: string) => {
  const { data } = await axiosInstance.get(`/bookings/client/${clientId}`);
  return data;
};

export const getBookingsByPlace = async (placeId: string) => {
  const { data } = await axiosInstance.get(`/bookings/place/${placeId}`);
  return data;
};
