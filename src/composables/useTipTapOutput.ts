import {computed, ref, type Ref, watchEffect} from 'vue'; // Added Ref
import {generateHTML} from '@tiptap/core';
import StarterKit from "@tiptap/starter-kit";

type OutputType = 'html' | 'text' | 'raw';

interface Options {
  outputType?: OutputType;
}

export function useTipTapOutput(inputProp: Ref<string>, options: Options = {}) {
  const {outputType = 'html'} = options;
  const outputContent = ref<string | object>(''); // Use a ref, allow object for 'raw' type

  watchEffect(() => {
    // Access .value since inputProp is a Ref
    const trimmed = inputProp.value ? inputProp.value.trim() : '';
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
        console.warn('Invalid JSON content or structure:', e);
        // Fall through if not valid TipTap JSON
      }
    }

    // 2. Treat as raw HTML (if not parsed as JSON, or if JSON parsing failed)
    // Check if it wasn't already successfully processed as JSON object
    if (typeof outputContent.value !== 'object' || (outputContent.value && Object.keys(outputContent.value).length === 0)) { // ensure it's not already a populated JSON object
      if (trimmed.startsWith('<')) {
        if (outputType === 'text') {
          const el = document.createElement('div');
          el.innerHTML = trimmed;
          result = el.textContent?.trim() || '';
        } else if (outputType === 'html' || outputType === 'raw') { // Treat 'raw' as html if it's not JSON
          result = trimmed;
        } else { // Fallback for 'text' if it wasn't caught by outputType === 'text'
          result = trimmed;
        }
        outputContent.value = result;
        return;
      }
    }


    // 3. Plain text fallback (if not JSON and not HTML that was processed)
    // Ensure it wasn't already set by JSON block or HTML block
    if (typeof outputContent.value !== 'object' || (outputContent.value && Object.keys(outputContent.value).length === 0)) {
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