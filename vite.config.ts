// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//       // "/api": "http://localhost:5000", // backend integration
//       "/api": "https://booking-tour-465o.onrender.com", // backend integration
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "https://booking-tour-465o.onrender.com", // backend integration
    },
  },
  build: {
    outDir: "build", // <-- Change output folder to "build" for Vercel
  },
});
