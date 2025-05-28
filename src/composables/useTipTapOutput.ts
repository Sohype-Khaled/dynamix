import {computed} from 'vue';
import {generateHTML} from '@tiptap/core';
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
    if (!input) return '';

    // 1. Try parsing as Tiptap JSON
    try {
      const json = JSON.parse(input);
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
    } catch {
      // Not JSON, continue
    }

    // 2. If it's HTML
    if (input.trim().startsWith('<')) {
      if (outputType === 'text') {
        const el = document.createElement('div');
        el.innerHTML = input;
        return el.textContent || el.innerText || '';
      }
      return input;
    }

    // 3. Plain text fallback
    if (outputType === 'html') {
      return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
    }

    return input;
  });

  return {
    content,
  };
}
