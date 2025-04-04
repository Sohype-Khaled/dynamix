<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import Prism from 'prismjs'

import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markup'

const props = defineProps<{
	code: string
	language?: string
}>()

const highlighted = ref('')

function highlightCode() {
	const lang = props.language || 'typescript'
	const grammar = Prism.languages[lang] || Prism.languages.typescript
	highlighted.value = Prism.highlight(props.code, grammar, lang)
}

async function copyCode() {
	try {
		await navigator.clipboard.writeText(props.code)
		// Optional: feedback message
		console.log('Copied to clipboard')
	} catch (error) {
		console.error('Clipboard copy failed:', error)
	}
}

onMounted(highlightCode)
watch(() => props.code, highlightCode)
</script>

<template>
	<div class="relative group">
		<button
			@click="copyCode"
			class="absolute top-2 right-2 text-xs text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
		>
			Copy
		</button>
		<pre class="rounded bg-gray-900 text-white text-sm overflow-auto p-4"><code v-html="highlighted" :class="`language-${language || 'typescript'}`"></code></pre>
	</div>
</template>
