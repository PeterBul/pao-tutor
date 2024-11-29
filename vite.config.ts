import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PAO Tutor: Generate Random Numbers for Memory Training",
        short_name: "PAO Tutor",
      },
    }),
  ],
  base: "/pao-tutor/",
});
