import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 1410,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        target: "https://jsonplaceholder.typicode.com/",
        ws: true,
      },
    },
  },
});

