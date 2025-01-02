import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  let basePath = "/validador-telemedicina/";
  if (mode === "local") {
    basePath = "/";
  } else if (mode === "desarrollo") {
    basePath = "/validador-telemedicina/";
  } else if (mode === "production") {
    basePath = "/validador-telemedicina/";
  }

  return {
    plugins: [react()],
    base: basePath,
    server: {
      host: true,
      watch: {
        usePolling: true,
      },
      historyApiFallback: true,
      cors: {
        origin: '*', 
        methods: ['GET'], 
        allowedHeaders: ['Content-Type', 'Authorization'], 
      },
    },
  };
});