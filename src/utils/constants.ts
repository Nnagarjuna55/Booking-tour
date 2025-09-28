// Booking and Slot status enums
export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "RESCHEDULED",
  "COMPLETED",
] as const;

export const SLOT_STATUSES = ["ACTIVE", "CANCELLED"] as const;

// Date format options for UI
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
