import type { Editor } from '@tiptap/vue-3'
/*
yarn add @tiptap/extension-collaboration \
@tiptap/extension-collaboration-cursor \
@tiptap/extension-color \
@tiptap/extension-highlight \
@tiptap/extension-image \
@tiptap/extension-link \
@tiptap/extension-subscript \
@tiptap/extension-superscript \
@tiptap/extension-table \
@tiptap/extension-table-cell \
@tiptap/extension-table-header \
@tiptap/extension-table-row \
@tiptap/extension-task-item \
@tiptap/extension-task-list \
@tiptap/extension-text-style \
@tiptap/extension-underline \
@tiptap/pm \
@tiptap/starter-kit \
@tiptap/vue-3
*/
export default function getToolbar(editor: Editor | null) {
  if (!editor) return []

  return [
    {
      title: 'Text Formatting',
      actions: [
        {
          label: 'Bold',
          icon: 'material-symbols:format-bold',
          title: 'Bold',
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
        },
        {
          label: 'Italic',
          icon: 'material-symbols:format-italic',
          title: 'Italic',
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
        },
        {
          label: 'Underline',
          icon: 'material-symbols:format-underlined',
          title: 'Underline',
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline'),
        },
        {
          label: 'Strike',
          icon: 'material-symbols:format-strikethrough',
          title: 'Strike',
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike'),
        },
        {
          label: 'Highlight',
          icon: 'material-symbols:highlight',
          title: 'Highlight',
          action: () => editor.chain().focus().toggleHighlight().run(),
          isActive: () => editor.isActive('highlight'),
        },
        {
          label: 'Code',
          icon: 'material-symbols:code',
          title: 'Inline Code',
          action: () => editor.chain().focus().toggleCode().run(),
          isActive: () => editor.isActive('code'),
        },
      ],
    },
    {
      title: 'Blocks',
      actions: [
        {
          label: 'H1',
          icon: 'material-symbols:looks-one',
          title: 'Heading 1',
          action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
          label: 'H2',
          icon: 'material-symbols:looks-two',
          title: 'Heading 2',
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive('heading', { level: 2 }),
        },
        {
          label: 'Paragraph',
          icon: 'material-symbols:format-paragraph',
          title: 'Paragraph',
          action: () => editor.chain().focus().setParagraph().run(),
          isActive: () => editor.isActive('paragraph'),
        },
        {
          label: 'Blockquote',
          icon: 'material-symbols:format-quote',
          title: 'Blockquote',
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote'),
        },
        {
          label: 'Code Block',
          icon: 'material-symbols:data-object',
          title: 'Code Block',
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock'),
        },
        {
          label: 'Horizontal Rule',
          icon: 'material-symbols:horizontal-rule',
          title: 'Horizontal Rule',
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: () => false,
        },
      ],
    },
    {
      title: 'Lists',
      actions: [
        {
          label: 'Bullet List',
          icon: 'material-symbols:format-list-bulleted',
          title: 'Bullet List',
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList'),
        },
        {
          label: 'Ordered List',
          icon: 'material-symbols:format-list-numbered',
          title: 'Ordered List',
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList'),
        },
        {
          label: 'Task List',
          icon: 'material-symbols:checklist',
          title: 'Task List',
          action: () => editor.chain().focus().toggleTaskList().run(),
          isActive: () => editor.isActive('taskList'),
        },
      ],
    },
    {
      title: 'Media & Links',
      actions: [
        {
          label: 'Image',
          icon: 'material-symbols:image',
          title: 'Insert Image',
          action: () => {
            const url = prompt('Image URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          },
          isActive: () => false,
        },
        {
          label: 'Link',
          icon: 'material-symbols:link',
          title: 'Insert Link',
          action: () => {
            const url = prompt('Link URL')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          },
          isActive: () => editor.isActive('link'),
        },
      ],
    },
    {
      title: 'Tables',
      actions: [
        {
          label: 'Insert Table',
          icon: 'material-symbols:grid-on',
          title: 'Insert Table',
          action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
          isActive: () => editor.isActive('table'),
        },
      ],
    },
    {
      title: 'History',
      actions: [
        {
          label: 'Undo',
          icon: 'material-symbols:undo',
          title: 'Undo',
          action: () => editor.chain().focus().undo().run(),
          isActive: () => false,
        },
        {
          label: 'Redo',
          icon: 'material-symbols:redo',
          title: 'Redo',
          action: () => editor.chain().focus().redo().run(),
          isActive: () => false,
        },
      ],
    },
  ]
}
