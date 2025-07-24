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

  preview: {
    allowedHosts: ["oorooree.com"],

    port: 4173,
    host: true,
  },
  build: {
    outDir: "build",
  },
});
