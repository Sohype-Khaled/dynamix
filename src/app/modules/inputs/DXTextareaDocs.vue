<script setup lang="ts">
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import {DXTextarea} from "@/components/inputs";
import {computed, reactive} from "vue";

// API Reference table
const apiDXTextarea = [
	{
		name: "label",
		description: "The label to show above the textarea.",
	},
	{
		name: "state",
		description: "'default' | 'success' | 'error' — controls the textarea's visual state.",
	},
	{
		name: "message",
		description: "Optional helper or error message shown below the textarea.",
	},
	{
		name: "v-model / modelValue",
		description: "Two-way bound value of the textarea.",
	},
	{
		name: "[...attrs]",
		description: "Any native textarea attributes like `rows`, `maxlength`, `disabled`, etc.",
	},
];

// Preview reactive config
const dxTextareaPreview = reactive({
	value: "",
	label: "Your Message",
	state: "default" as "default" | "success" | "error",
	message: "",
	disabled: false,
	required: false,
	rows: 4,
	maxlength: 200,
});

// Dynamic code generation
const textareaCode = computed(() => {
	const attrs = [];

	if (dxTextareaPreview.label) attrs.push(`label="${dxTextareaPreview.label}"`);
	if (dxTextareaPreview.state !== "default") attrs.push(`state="${dxTextareaPreview.state}"`);
	if (dxTextareaPreview.message) attrs.push(`message="${dxTextareaPreview.message}"`);
	if (dxTextareaPreview.disabled) attrs.push(`:disabled="true"`);
	if (dxTextareaPreview.required) attrs.push(`:required="true"`);
	if (dxTextareaPreview.rows !== 4) attrs.push(`:rows="${dxTextareaPreview.rows}"`);
	if (dxTextareaPreview.maxlength !== 200) attrs.push(`:maxlength="${dxTextareaPreview.maxlength}"`);

	attrs.push(`v-model="value"`);

	return `<DXTextarea ${attrs.join(" ")} />`;
});
</script>

<template>
	<PreviewBlock
		title="DXTextarea"
		description="A wrapper around <code>DXInputWrapper</code> that renders a textarea with consistent styling and validation state."
		:inputCode="textareaCode"
		:apiData="apiDXTextarea"
		class="mb-8"
	>
		<div class="w-full space-y-4">
			<DXTextarea
				v-model="dxTextareaPreview.value"
				:label="dxTextareaPreview.label"
				:state="dxTextareaPreview.state"
				:message="dxTextareaPreview.message"
				:disabled="dxTextareaPreview.disabled"
				:required="dxTextareaPreview.required"
				:rows="dxTextareaPreview.rows"
				:maxlength="dxTextareaPreview.maxlength"
			/>

			<p class="text-sm text-gray-600">Textarea Value: {{ dxTextareaPreview.value }}</p>
		</div>

		<template #controls>
			<div class="space-y-4">
				<input v-model="dxTextareaPreview.label" placeholder="Label" class="input w-full"/>
				<input v-model="dxTextareaPreview.message" placeholder="Message" class="input w-full"/>
				<select v-model="dxTextareaPreview.state" class="input w-full">
					<option value="default">Default</option>
					<option value="success">Success</option>
					<option value="error">Error</option>
				</select>
				<label><input type="checkbox" v-model="dxTextareaPreview.disabled"/> Disabled</label>
				<label><input type="checkbox" v-model="dxTextareaPreview.required"/> Required</label>
				<div>
					<label class="font-semibold">Rows</label>
					<input v-model.number="dxTextareaPreview.rows" type="number" min="1" class="input w-full"/>
				</div>
				<div>
					<label class="font-semibold">Maxlength</label>
					<input v-model.number="dxTextareaPreview.maxlength" type="number" min="10" class="input w-full"/>
				</div>
			</div>
		</template>
	</PreviewBlock>
</template>
