<script setup lang="ts">
import {ref, watch, useTemplateRef} from 'vue'
import { useDebounceFn, isClient } from '@vueuse/core'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/vue'

import DXEmojiPicker from './DXEmojiPicker.vue'
import { serializeEditorContent, setEditorContent } from '@/components/inputs/DXTipTapEditor/helpers'
import type { EditorContentType } from '@/types/chat'

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
		attributes: { class: 'focus:outline-none text-left' },
	},
	onUpdate: ({ editor }) => {
		const value = serializeEditorContent(editor, props.contentType)
		emit('update:modelValue', value)
		emitTyping()
	},
})

const insertEmoji = (emoji: string) => {
	editor.value?.chain().focus().insertContent(emoji).run()
}

const emitTyping = useDebounceFn(() => emit('typing'), 300)

const onKeyDown = (event: KeyboardEvent) => {
	if (event.key === 'Enter' && !event.shiftKey) {
		event.preventDefault()
		emojiRef.value?.close?.()
		emit('submit', props.modelValue)
	}
}

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
})
</script>

<template>
	<div
		ref="containerRef"
		class="relative p-2.5 w-full text-sm text-gray-800 rounded-xl pr-10 bg-white border border-primary-300 focus:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-150"
	>
		<EditorContent
			:editor="editor"
			@keydown="onKeyDown"
			class="flex-1"
		/>

		<!-- Emoji Toggle Button -->
		<button
			type="button"
			ref="toggleRef"
			@click="isClient && emojiRef?.toggle?.()"
			aria-label="Insert emoji"
			title="Insert emoji"
			class="absolute bottom-0.5 right-0.5 text-gray-600 hover:text-primary-600 inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-primary-50/50"
		>
			<Icon icon="mdi:emoticon-outline" class="w-5 h-5" />
		</button>
		<!-- Emoji Picker -->
		<DXEmojiPicker ref="emojiRef" @select="insertEmoji" :ignoreRefs="[toggleRef]" />
	</div>
</template>
