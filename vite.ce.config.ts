import vue from "@vitejs/plugin-vue";

export default {
  define: {"process.env.NODE_ENV": JSON.stringify("production")},

  plugins: [
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/ce",
    manifest: true,
    lib: {
      entry: "./src/elements.ts",
      fileName: (format: string) => `dynamix.ce.${format}.js`,
      formats: ["iife"],
      name: "Dynamix",
    },
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true
      },
    },
  }
};
