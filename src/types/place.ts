export interface PlaceDTO {
  _id?: string;
  name: string;
  location: string;
  description?: string;
  images?: string[];
  // include optional slots when backend returns them (used by PlaceCard)
  slots?: import("./slot").SlotDTO[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
