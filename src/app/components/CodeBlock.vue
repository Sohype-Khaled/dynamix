<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue'
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
			class="absolute top-2 right-2 text-xs text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
		>
			Copy
		</button>
		<pre class=" rounded text-sm overflow-auto p-4 transition-all
             bg-neutral text-gray-800
             dark:bg-neutral-600 dark:text-gray-200"><code
			v-html="highlighted"
			:class="`language-${language || 'typescript'}`"></code></pre>
	</div>
</template>


<style scoped lang="css">

:deep(pre[class*="language-"]),
:deep(code[class*="language-"]) {
/*	color: #d4d4d4;
	font-size: 13px;
	text-shadow: none;
	font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
	direction: ltr;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	line-height: 1.5;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;*/
	color: #d4d4d4;
	font-size: 13px;
	text-shadow: none;
	font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
	direction: ltr;
	text-align: left;

	/* KEY UPDATES */
	white-space: pre-wrap;      /* Allow wrapping */
	word-break: break-word;     /* Break long words */
	overflow-wrap: break-word;  /* Extra compatibility */

	word-spacing: normal;
	line-height: 1.5;
	tab-size: 4;
	hyphens: none;
}



:deep(code[class*="language-"] .token) {
	background: transparent !important;
}
</style>