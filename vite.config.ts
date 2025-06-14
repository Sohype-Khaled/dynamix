import {defineConfig} from "vite";


import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, URL} from "node:url";


// @ts-ignore
export default defineConfig((command: any, mode: any) => {
  const tailwindConfigForBuildLib = {
    darkMode: "class",
    content: [
      "./src/components/**/*.vue",
      "./src/app/**/*.vue",
    ],
    corePlugins: {preflight: false} // Disable Preflight for library build
  };

  const tailwindConfigForServe = {
    darkMode: "class",
    content: [
      "./index.html", // Scans the main HTML file
      "./src/**/*.{vue,js,ts,jsx,tsx}", // Scans all Vue, JS, TS files in src
    ],
    // For dev server, let Tailwind use its default preflight, or explicitly enable if needed.
    // corePlugins: { preflight: true } // Default is true, so omitting this is fine.
  };

  return {
    plugins: [
      vue(),
      dts({insertTypesEntry: true}),
      tailwindcss({
        config: command === 'build' ? tailwindConfigForBuildLib : tailwindConfigForServe
      }),
      typescript2({
        check: false,
        include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"],
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
  }
});