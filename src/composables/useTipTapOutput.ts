import { computed, ref, watchEffect } from 'vue'; // Added ref and watchEffect
import { generateHTML } from '@tiptap/core';
import StarterKit from "@tiptap/starter-kit";

type OutputType = 'html' | 'text' | 'raw';

interface Options {
  outputType?: OutputType;
}

export function useTipTapOutput(inputProp: string, options: Options = {}) { // Renamed input to inputProp for clarity
  const { outputType = 'html' } = options;
  const outputContent = ref<string | object>(''); // Use a ref, allow object for 'raw' type

  watchEffect(() => {
    // Ensure inputProp is not null or undefined before trimming
    const trimmed = inputProp ? inputProp.trim() : '';
    let result: string | object = ''; // Ensure result can be an object for 'raw'

    if (!trimmed) {
      outputContent.value = '';
      return;
    }

    // 1. Try parsing as Tiptap JSON
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const json = JSON.parse(trimmed);
        if (json?.type === 'doc') {
          if (outputType === 'raw') {
            outputContent.value = json; // Assign raw JSON
            return;
          }
          if (outputType === 'text') {
            result = generateHTML(json, [StarterKit])
              .replace(/<[^>]+>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          } else { // 'html'
            result = generateHTML(json, [StarterKit]);
          }
          outputContent.value = result;
          return;
        }
      } catch (e) {
        // If JSON parsing fails but it looked like JSON, it might be malformed.
        // Current logic falls through.
        console.warn('Invalid JSON content or structure:', e);
      }
    }

    // 2. Treat as raw HTML (if not parsed as JSON)
    // Check if it wasn't processed by JSON block but still looks like HTML
    if (typeof result !== 'object' && trimmed.startsWith('<')) {
      if (outputType === 'text') {
        // A more robust way to get text from HTML
        const el = document.createElement('div');
        el.innerHTML = trimmed;
        result = el.textContent?.trim() || '';
      } else if (outputType === 'html' || outputType === 'raw') { // Treat 'raw' as html if it's not JSON
        result = trimmed;
      } else { // Fallback for 'text' if it wasn't caught by outputType === 'text' (should not happen)
        result = trimmed;
      }
      outputContent.value = result;
      return;
    }

    // 3. Plain text fallback (if not JSON and not HTML)
    if (typeof result !== 'object') { // Ensure it wasn't already set by JSON block
      if (outputType === 'html') {
        result = trimmed
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
      } else { // 'text' or 'raw' (if not JSON/HTML)
        result = trimmed;
      }
      outputContent.value = result;
    }
  });

  // Return a computed property for compatibility with original API
  const content = computed(() => outputContent.value);

  return {
    content,
  };
}