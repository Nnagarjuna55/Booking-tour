import axios from "axios";

// Hardcoded backend base URL (production). Replace if backend URL changes.
const baseURL = "https://booking-tour-backend-mlgs.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
