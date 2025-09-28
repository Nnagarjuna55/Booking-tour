export interface SlotDTO {
  _id?: string;
  placeId: string;
  startAt: string; // ISO date string
  endAt: string;   // ISO date string
  capacity: number;
  bookedCount?: number;
  status?: "ACTIVE" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
}
