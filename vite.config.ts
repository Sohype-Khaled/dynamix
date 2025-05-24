import {defineConfig} from "vite";


import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, URL} from "node:url";

export default defineConfig({
  plugins: [
    vue(),
    dts({insertTypesEntry: true}),
    tailwindcss(),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist/lib",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  resolve: {
    alias: [
      // @ts-ignore
      {find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
    ],
  },
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    lib: {
      entry: "./src/index.ts",
      name: "Dynamix",
      formats: ["es", "cjs", "umd"],
      fileName: (format: string) => `dynamix.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "axios",
        "@tailwindcss/vite",
        "tailwindcss",
      ],
      output:
        {
          assetFileNames: (assetInfo: any) => assetInfo.name === "style.css" ? "style.css" : assetInfo.name,
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
    },
  },
});