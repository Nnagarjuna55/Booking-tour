import { ClientDTO } from "./client";
import { PlaceDTO } from "./place";
import { SlotDTO } from "./slot";

export interface BookingDTO {
  _id?: string;
  clientId: string | ClientDTO;
  clientSnapshot?: Partial<ClientDTO>;
  placeId: string | PlaceDTO;
  slotId: string | SlotDTO;
  quantity: number;
  status?:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "RESCHEDULED"
    | "COMPLETED";
  confirmationCode?: string;
  createdAt?: string;
  updatedAt?: string;
}
