import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import stdLibBrowser from "node-stdlib-browser";
import inject from "@rollup/plugin-inject";

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    vue(),
    {
      ...inject({
        global: [
          require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
          "global",
        ],
        process: [
          require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
          "process",
        ],
        Buffer: [
          require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
          "Buffer",
        ],
      }),
      enforce: "post",
    },
  ],
  build: {
    target: ["es2022"],
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
  optimizeDeps: {
    include: ["buffer", "process", "fs"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      ...stdLibBrowser,
      // fs: "./node_modules/browserify-fs/index.js",
      // fs: "./node_modules/fs-extra/lib/index.js",
    },
  },
});
