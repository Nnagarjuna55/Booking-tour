// Simple email regex validator
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Phone number validator (basic 10-digit, can be extended for E.164)
export const isValidPhone = (phone: string): boolean => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

// Check if required fields are filled
export const validateRequired = (
  obj: Record<string, any>,
  fields: string[]
): string[] => {
  return fields.filter((f) => !obj[f] || obj[f].toString().trim() === "");
};
