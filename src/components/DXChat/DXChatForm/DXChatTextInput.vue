<script setup lang="ts">
import {ref, useTemplateRef, watch} from 'vue'
import {useDebounceFn} from '@vueuse/core'
import {EditorContent, useEditor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import DXEmojiPicker from './DXEmojiPicker.vue'
import {serializeEditorContent, setEditorContent} from '@/components/inputs/DXTipTapEditor/helpers'
import type {EditorContentType} from '@/types/chat'
import type {Editor} from "@tiptap/core";

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
	(e: 'submit', message: string): void
	(e: 'typing'): void
}>()

const props = withDefaults(defineProps<{
	modelValue: string | null
	contentType?: EditorContentType
}>(), {
	contentType: 'text',
})

const containerRef = ref<HTMLElement | null>(null)
const emojiRef = ref<typeof DXEmojiPicker | null>(null)
const toggleRef = useTemplateRef<HTMLElement>('ignoreEl')

const editor = useEditor({
	content: props.modelValue,
	extensions: [StarterKit],
	editorProps: {
		attributes: {class: 'focus:outline-none  word-break break-all mt-[6px] ms-[6px]'},
		handleKeyDown(view, event) {
			if (event.key === 'Enter' && !event.shiftKey) {
				event.preventDefault()

				const value = serializeEditorContent(editor.value as Editor, props.contentType)
				if (!value.trim()) return true

				emojiRef.value?.close?.()
				emit('submit', value)

				return true
			}

			return false
		},

	},
	onUpdate: ({editor}) => {
		const value = serializeEditorContent(editor, props.contentType)
		emit('update:modelValue', value)
		emitTyping()
	},
})

const insertEmoji = (emoji: string) => {
	editor.value?.chain().focus().insertContent(emoji).run()
}

const emitTyping = useDebounceFn(() => emit('typing'), 300)

watch(() => props.modelValue, (newValue) => {
	if (!editor.value) return
	const current = serializeEditorContent(editor.value, props.contentType)
	if (current !== newValue) {
		setEditorContent(editor.value, props.contentType, newValue ?? '')
	}
})

defineExpose({
	clearContent: () => editor.value?.commands.clearContent(),
	focus: () => editor.value?.commands.focus(),
	toggleEmoji: () => emojiRef.value?.toggle?.(),
})
</script>

<template>
	<div
		ref="containerRef"
		class="vue-dynamix tiny-scroll-bar flex relative w-full overflow-y-auto text-sm text-gray-800 rounded-xl bg-white border border-gray-200 focus:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 min-h-[36px]  max-h-[64px] transition-all duration-150"
	>
		<!-- Editor Content -->
		<EditorContent :editor="editor" class="flex-1 "/>

		<!-- Emoji Picker -->
		<DXEmojiPicker ref="emojiRef" @select="insertEmoji" :ignoreRefs="[toggleRef]"/>
	</div>
</template>

<style scoped>
:deep(.ProseMirror) {
	white-space: pre-wrap;
	outline: none;
	overflow-wrap: break-word;
}

.tiny-scroll-bar::-webkit-scrollbar {
	width: 4px;
}

.tiny-scroll-bar::-webkit-scrollbar-track {
	background: transparent;
}

.tiny-scroll-bar::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 2px;
}

.tiny-scroll-bar::-webkit-scrollbar-thumb:hover {
	background-color: rgba(0, 0, 0, 0.4);
}

.tiny-scroll-bar {
	scrollbar-width: thin; /* Firefox */
	scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>
