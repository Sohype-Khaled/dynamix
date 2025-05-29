// vite.config.css.js
import { defineConfig } from 'vite';
import path from 'path'; // May not be needed if library.css uses relative paths for imports

export default defineConfig({
  // No 'resolve.alias' needed if library.css uses relative paths like @import './plugin.css'
  // which it does.

  build: {
    outDir: 'dist',
    emptyOutDir: false, // Crucial: set to false, assuming JS build runs first.
    // We want the CSS file directly in 'dist', not in 'dist/assets'.
    // Setting assetsDir to '.' and then explicitly naming the CSS output
    // via assetFileNames is a common way.
    assetsDir: '.', 
    rollupOptions: {
      input: {
        // Define 'library.css' as the sole input.
        // The key 'dynamix-styles' here is arbitrary for the input chunk name.
        'dynamix-styles': 'src/assets/library.css',
      },
      output: {
        // This function controls the names of emitted asset files.
        assetFileNames: (assetInfo) => {
          // Check if the asset being processed is the CSS output from our 'dynamix-styles' input.
          // Vite might name it based on the input key, e.g., 'dynamix-styles.css'.
          if (assetInfo.name === 'dynamix-styles.css') {
            return 'index.css'; // Output it as 'index.css' in the 'dist' directory.
          }
          // For any other assets (if library.css were to include images/fonts, which it doesn't)
          return '[name].[hash][extname]'; 
        },
        // We don't want JS output from this CSS-only build.
        // However, Vite might still create a small JS chunk if 'library' is an entry.
        // The focus is ensuring the CSS is correctly generated and named.
        // To prevent JS output, ensure no 'entryFileNames' or 'chunkFileNames' are set
        // that would produce JS from this CSS entry.
        // The fact that the input is a .css file should signal to Vite.
      }
    },
  },
  plugins: [] // Explicitly no plugins (no vue(), no tailwindcss())
});
