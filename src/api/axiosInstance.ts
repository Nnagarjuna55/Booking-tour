// import axios from "axios";

// const axiosInstance = axios.create({
//   https:"//booking-tour-backend-mlgs.onrender.com": "/api", // proxied to backend
//   // baseURL: "/api", // proxied to backend
//   headers: { "Content-Type": "application/json" },
// });

// // attach token if available
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://booking-tour-backend-mlgs.onrender.com/api", // ✅ backend base URL
  headers: { "Content-Type": "application/json" },
});

// attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
