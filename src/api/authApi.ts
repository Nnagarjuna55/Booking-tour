import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

export const register = async (
  email: string,
  password: string,
  role: "SUPER_ADMIN" | "STAFF" = "STAFF"
) => {
  const { data } = await axiosInstance.post("/auth/register", {
    email,
    password,
    role,
  });
  return data;
};
