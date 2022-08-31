import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    assetsInlineLimit: 2048000,
    rollupOptions: {
      output: {
        entryFileNames: "static/randomseat/js/randomseat.js",
        chunkFileNames: "static/randomseat/js/randomseat.chunk.js",
        assetFileNames: (assetsInfo) => {
          let extType = assetsInfo.name.split(".").pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|svg/i.test(extType)) {
            extType = "img";
          }
          if (extType === "css") {
            return `static/randomseat/css/style.css`;
          }
          return `static/randomseat/${extType}/[name][extname]`;
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
