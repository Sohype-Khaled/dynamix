import { computed } from 'vue';
import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';

type OutputType = 'html' | 'text' | 'raw';

interface Options {
  outputType?: OutputType;
}

export function useTipTapOutput(input: string, options: Options = {}) {
  const { outputType = 'html' } = options;

  const content = computed(() => {
    const trimmed = input.trim();
    if (!trimmed) return '';

    // 1. Try parsing as Tiptap JSON
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const json = JSON.parse(trimmed);
        if (json?.type === 'doc') {
          if (outputType === 'raw') return json;
          if (outputType === 'text') {
            return generateHTML(json, [Document, Paragraph, Text, Bold])
              .replace(/<[^>]+>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
          return generateHTML(json, [Document, Paragraph, Text, Bold]);
        }
      } catch (e) {
        console.warn('Invalid JSON content:', e);
        // fall through to other formats
      }
    }

    // 2. Treat as raw HTML
    if (trimmed.startsWith('<')) {
      if (outputType === 'text') {
        const el = document.createElement('div');
        el.innerHTML = trimmed;
        return el.textContent?.trim() || '';
      }
      return trimmed;
    }

    // 3. Plain text fallback
    if (outputType === 'html') {
      return trimmed
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    }

    return trimmed;
  });

  return {
    content,
  };
}
