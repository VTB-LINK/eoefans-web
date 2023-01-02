import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
// 可视化打包文件
import { visualizer } from "rollup-plugin-visualizer";
// gzip
import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
  plugins: [react(), visualizer(), viteCompression()],
  build: {
    target: "es2015",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
