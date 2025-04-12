<script setup lang="ts">
import {computed, watch, watchEffect} from 'vue'
import {type Editor, EditorContent, useEditor} from '@tiptap/vue-3'
import type {JSONContent} from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {TextAlign} from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight'
import DXTipTapToolbar from "@/components/inputs/DXTipTapEditor/DXTipTapToolbar.vue";
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const props = defineProps<{
	modelValue?: JSONContent
	editableClass?: string | string[]
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: JSONContent): void
}>()


// Normalize class input
const normalizedClass = computed(() => {
	const base = ['tiptap', 'min-h-[6rem]', 'resize-none', 'rounded-t-none']
	const extra = Array.isArray(props.editableClass)
		? props.editableClass
		: props.editableClass?.split(' ') ?? []
	return [...base, ...extra].join(' ')
})

const editor = useEditor({
	content: props.modelValue,
	extensions: [
		StarterKit,
		Highlight,
		Underline,
		Highlight,
		Color,
		TextStyle,
		Link.configure({openOnClick: false}),
		Image,
		TaskList,
		TaskItem.configure({nested: true}),
		Subscript,
		Superscript,
		Table.configure({resizable: true}),
		TableRow,
		TableHeader,
		TableCell,
		TextAlign.configure({types: ['heading', 'paragraph']}),
	],
	editorProps: {
		attributes: {
			class: normalizedClass.value
		}
	}
})

// Update editor class when class changes
watchEffect(() => {
	if (editor.value) {
		editor.value.setOptions({
			editorProps: {
				attributes: {
					class: normalizedClass.value
				}
			}
		})
	}
})

// Sync external modelValue to editor
watch(() => props.modelValue, (newVal) => {
	if (editor.value && newVal && JSON.stringify(editor.value.getJSON()) !== JSON.stringify(newVal)) {
		editor.value.commands.setContent(newVal, false)
	}
})

// Emit updated JSON when content changes
watch(() => editor.value?.getJSON(), (json) => {
	if (json && JSON.stringify(json) !== JSON.stringify(props.modelValue)) {
		emit('update:modelValue', json)
	}
})

defineExpose(['editor'])
</script>

<template>
	<DXTipTapToolbar :editor="editor as Editor"/>

	<EditorContent :editor="editor"/>
</template>


<style scoped>
/* Basic editor styles */
.tiptap :first-child {
	margin-top: 0;
}

/* List styles */
.tiptap ul,
.tiptap ol {
	padding: 0 1rem;
	margin: 1.25rem 1rem 1.25rem 0.4rem;
}

.tiptap ul li p,
.tiptap ol li p {
	margin-top: 0.25em;
	margin-bottom: 0.25em;
}

/* Heading styles */
.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
	line-height: 1.1;
	margin-top: 2.5rem;
	text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
	margin-top: 3.5rem;
	margin-bottom: 1.5rem;
}

.tiptap h1 {
	font-size: 1.4rem;
}

.tiptap h2 {
	font-size: 1.2rem;
}

.tiptap h3 {
	font-size: 1.1rem;
}

.tiptap h4,
.tiptap h5,
.tiptap h6 {
	font-size: 1rem;
}

/* Code and preformatted text styles */
.tiptap code {
	background-color: var(--color-primary);
	border-radius: 0.4rem;
	color: var(--color-primary-800);
	font-size: 0.85rem;
	padding: 0.25em 0.3em;
}

.tiptap pre {
	background: var(--color-neutral-500);
	border-radius: 0.5rem;
	color: var(--color-white);
	font-family: 'JetBrainsMono', monospace;
	margin: 1.5rem 0;
	padding: 0.75rem 1rem;
}

.tiptap pre code {
	background: none;
	color: inherit;
	font-size: 0.8rem;
	padding: 0;
}

.tiptap mark {
	background-color: #FAF594;
	border-radius: 0.4rem;
	box-decoration-break: clone;
	padding: 0.1rem 0.3rem;
}

.tiptap blockquote {
	border-left: 3px solid var(--color-gray-300);
	margin: 1.5rem 0;
	padding-left: 1rem;
}

.tiptap hr {
	border: none;
	border-top: 1px solid var(--color-gray-300);
	margin: 2rem 0;
}

</style>