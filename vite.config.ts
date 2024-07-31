import MillionLint from '@million/lint';
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const _plugins = [react()];
_plugins.unshift(MillionLint.vite())
export default defineConfig(async () => ({
  plugins: _plugins,
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`
      }
    }
  },
  build: {
    // Configure ES module output
    target: 'esnext'
  }
}));