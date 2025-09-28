// Format date into readable form
export const formatDateTime = (iso: string) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Truncate text for table cells or previews
export const truncate = (text: string, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Generate random fallback avatar (for clients without image)
export const generateAvatar = (name: string) => {
  if (!name) return "👤";
  return name.charAt(0).toUpperCase();
};
