import type { App } from 'vue';
import type { DynamixOptions } from "@/types/plugin-options";
import { DYNAMIX_OPTIONS_KEY } from "@/globals/plugin-symbol";
import * as components from "@/components"; // assuming the DX components are grouped

const DynamixPlugin = {
  install: (app: App, options: DynamixOptions = {}) => {
    // Register all components
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }

    // Provide options globally
    app.provide(DYNAMIX_OPTIONS_KEY, options);
  }
};

export { DynamixPlugin };