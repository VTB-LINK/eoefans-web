import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
// 可视化打包文件
import { visualizer } from "rollup-plugin-visualizer";
// gzip
import viteCompression from "vite-plugin-compression";
// polyfill
import legacy from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [
    react(),
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: [
        "defaults",
        "iOS >= 9, Android >= 4.4, last 2 versions, > 0.2%, not dead",
      ],
    }),
    { ...visualizer(), apply: "build" },
    { ...viteCompression(), apply: "build" },
  ],
  build: {
    // target: "es2015",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          "react-redux": ["@reduxjs/toolkit", "react-redux"],
          lib: [
            "@mui/icons-material",
            "@mui/lab",
            "@mui/material",
            "@emotion/react",
            "@emotion/styled",
          ],
          "dnd-tool": [
            "@dnd-kit/core",
            "@dnd-kit/modifiers",
            "@dnd-kit/sortable",
            "@dnd-kit/utilities",
          ],
          ployfill: [
            "whatwg-fetch",
            "intersection-observer",
            "react-flip-toolkit",
            "react-intersection-observer",
            "dayjs",
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      "/v1": {
        target: "https://api.eoe.best/eoefans-api",
        changeOrigin: true,
      },
    },
  },
});
