import path from "path";
import dts from "vite-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue(),
    dts({insertTypesEntry: true}),
    // cssInjectedByJsPlugin(),
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
        "vuedraggable",
        "@tailwindcss/vite",
        "tailwindcss",
        "flowbite",
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
};
