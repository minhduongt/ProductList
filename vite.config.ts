import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [
    react({
      include: "**/*.js, **/*.ts, **/*.jsx, **/*.tsx",
    }),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
