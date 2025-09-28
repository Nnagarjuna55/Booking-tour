// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "/api", // proxied to backend
// });

// // attach token if available
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   // If sending FormData the browser/axios will set the correct Content-Type including boundary.
//   // We avoid forcing 'application/json' globally so file uploads work as expected.
//   return config;
// });

// export default axiosInstance;


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
