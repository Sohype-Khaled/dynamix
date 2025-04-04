<script setup lang="ts">
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import {DXInput} from "@/components/inputs";
import CodeBlock from "@/app/components/CodeBlock.vue";
import ApiTable from "@/app/components/ApiTable.vue";
import {ref} from "vue";

const apiDXInput = [
	{
		name: "label",
		description: "The label to show above the input."
	},
	{
		name: "state",
		description: "`'default' | 'success' | 'error'` — controls the input's visual state."
	},
	{
		name: "message",
		description: "Optional helper or error message shown below the input."
	},
	{
		name: "v-model / modelValue",
		description: "Two-way bound value of the input."
	},
	{
		name: "[...attrs]",
		description: "Any native input attributes like `type`, `autocomplete`, etc."
	}
]
const examples = {
	dxInput: `
 <DXInput
    v-model="name"
    label="Your Name"
    placeholder="Enter your name"
  />
	`.trim()
}

const name =
	ref('')
</script>

<template>
	<h2 class="text-xl font-semibold mb-4"><code>&lt;DXInput /&gt;</code></h2>
	<PreviewBlock title="DXInput" class="mb-8">
		<DXInput label="Name" type="text" v-model="name"/>
	</PreviewBlock>


	<p class="text-gray-600 mb-8">
		A wrapper around <code>&lt;DXFloatingLabel /&gt;</code> that renders a standard input with consistent styling and
		validation state.
	</p>

	<!-- Code Block -->
	<section class="mb-12">
		<h2 class="text-xl font-semibold mb-4">Usage Code</h2>
		<CodeBlock :code="examples.dxInput" language="vue"/>
	</section>

	<!-- API Table -->
	<section>
		<h2 class="text-xl font-semibold mb-4">API Reference</h2>
		<ApiTable :items="apiDXInput"/>
	</section>

</template>

