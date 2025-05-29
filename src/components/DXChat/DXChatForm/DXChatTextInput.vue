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
	modelValue: string
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
		attributes: {class: 'focus:outline-none text-left m-2.5 rounded-xl'},
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

/*
const insertEmoji = (emoji: string) => {
	editor.value?.chain().focus().insertContent(emoji).run()
}
*/

const emitTyping = useDebounceFn(() => emit('typing'), 300)

watch(() => props.modelValue, (newValue) => {
	if (!editor.value) return
	const current = serializeEditorContent(editor.value, props.contentType)
	if (current !== newValue) {
		setEditorContent(editor.value, props.contentType, newValue)
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
		class="vue-dynamix relative w-full text-sm text-gray-800 rounded-xl  bg-white border border-primary-300 focus:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all duration-150"
	>
		<div class="overflow-y-auto max-h-[4.5em] scroll scroll-thin scroll-track-hidden">
			<EditorContent :editor="editor" class="flex-1"/>
		</div>
		<!-- Emoji Picker -->
<!--		<DXEmojiPicker ref="emojiRef" @select="insertEmoji" :ignoreRefs="[toggleRef]"/>-->
	</div>
</template>

<style scoped>

:deep(.ProseMirror) {
	white-space: pre-wrap;
	outline: none;
	overflow-wrap: break-word;
	min-height: 1.5em; /* at least one line */
	line-height: 1.5em;
}
</style>
