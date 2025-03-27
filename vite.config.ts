import {defineConfig, mergeConfig} from "vite";
import path from "path";
import libraryConfig from "./vite.lib.config";
import ceConfig from "./vite.ce.config";
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({mode}) => {
  const isCustomElement = mode === "custom-element";
  const isLibrary = mode === "library";

  // Base Vite Config
  const baseConfig = {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: isCustomElement ? 3001 : 3000,
      open: isCustomElement ? '/index.ce.html' : '/index.html',
    }
  };

  return mergeConfig(
    baseConfig,
    isCustomElement ? ceConfig : isLibrary ? libraryConfig : {}
  );
});