import type {Editor} from '@tiptap/core'
import type {EditorContentType} from "@/types/chat";

export function serializeEditorContent(editor: Editor, type: EditorContentType): string {
  switch (type) {
    case 'json':
      return JSON.stringify(editor.getJSON())
    case 'text':
      return editor.getText()
    default:
      return editor.getHTML()
  }
}

export function setEditorContent(editor: Editor, type: EditorContentType, value: string) {
  switch (type) {
    case 'json':
      try {
        editor.commands.setContent(JSON.parse(value))
      } catch (e) {
        console.warn('Invalid JSON content:', e)
      }
      break
    default:
      editor.commands.setContent(value)
  }
}
