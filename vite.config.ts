import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    svgr({
      svgrOptions: {
        icon: false,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false, // Garder viewBox pour la responsivité
                  cleanupIds: false, // Garder les IDs pour l'accessibilité
                },
              },
            },
            "removeDimensions", // Supprimer width/height fixes
          ],
        },
      },
    }),
  ],
  base: "/",
  assetsInclude: ["**/*.webp"],
  server: {
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
