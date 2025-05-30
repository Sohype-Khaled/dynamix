// vite.config.ts
import { defineConfig } from 'vite';
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command, mode }) => {
  const tailwindConfigForBuildLib = {
    content: [
      "./src/components/**/*.vue", 
      "./src/app/**/*.vue",
    ],
    corePlugins: { preflight: false } // Disable Preflight for library build
  };

  const tailwindConfigForServe = {
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
      dts({ insertTypesEntry: true }), // Preserve existing dts options
      tailwindcss({
        // Use conditional config based on the command (build vs. serve)
        config: command === 'build' ? tailwindConfigForBuildLib : tailwindConfigForServe
      }),
      typescript2({ // Preserve existing typescript2 options
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
    resolve: { // Preserve existing resolve options
      alias: [
        // @ts-ignore
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ],
    },
    build: { // These options primarily apply to the library build ('vite build' or 'yarn build:js')
      outDir: "dist",
      cssCodeSplit: true, // This was in the original config. May or may not be relevant for the JS lib build if it doesn't emit CSS.
      lib: {
        entry: "./src/index.ts",
        name: "Dynamix",
        formats: ["es", "cjs", "umd"],
        fileName: (format) => `dynamix.${format}.js`,
      },
      rollupOptions: {
        external: [ // Preserve existing externals
          "vue",
          "axios",
          "@tailwindcss/vite", // Still listed as external
          "tailwindcss",
        ],
        output: {
          // Preserve existing output options
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    // Preserve any other top-level config options if they exist (none in the original apart from plugins, resolve, build)
  };
});