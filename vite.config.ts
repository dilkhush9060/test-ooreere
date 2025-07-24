import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: ["3f58cd1d2dda.ngrok-free.app"],
  },
  preview: {
    allowedHosts: ["oorooree.com"],
    port: 4173,
    host: true,
  },
});
