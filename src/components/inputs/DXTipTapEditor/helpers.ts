import type {Editor} from '@tiptap/core'
import type {EditorContentType} from "@/types/chat";

export function serializeEditorContent(editor: Editor, type: EditorContentType): string {
  const json = editor.getJSON();

  switch (type) {
    case 'json':
      if (!json || !json.content || json.content.length === 0) {
        return '';
      }
      return JSON.stringify(json);
    case 'text':
      return editor.getText();
    default:
      return editor.getHTML();
  }
}

export function setEditorContent(editor: Editor, type: EditorContentType, value: string) {
  if (!value?.trim()) {
    editor.commands.clearContent();
    return;
  }

  switch (type) {
    case 'json':
      try {
        const parsed = JSON.parse(value);
        // Only set if parsed is valid Tiptap doc
        if (parsed?.type === 'doc') {
          editor.commands.setContent(parsed);
        } else {
          console.warn('Invalid TipTap JSON structure');
          editor.commands.clearContent();
        }
      } catch (e) {
        console.warn('Invalid JSON content:', e);
        editor.commands.clearContent();
      }
      break;

    default:
      editor.commands.setContent(value);
  }
}