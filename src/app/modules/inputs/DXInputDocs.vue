<script setup lang="ts">
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import {DXInput} from "@/components/inputs";
import {computed, reactive} from "vue";

const apiDXInput = [
	{
		name: "label",
		description: "The label to show above the input."
	},
	{
		name: "state",
		description: "'default' | 'success' | 'error' — controls the input's visual state."
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

const dxInputPreview = reactive({
	value: '',
	label: 'Your Name',
	state: 'default' as 'default' | 'success' | 'error',
	message: '',
	type: 'text',
	disabled: false,
	required: false,
});

const inputCode = computed(() => {
	const attrs = [];

	if (dxInputPreview.label) attrs.push(`label="${dxInputPreview.label}"`);
	if (dxInputPreview.state !== 'default') attrs.push(`state="${dxInputPreview.state}"`);
	if (dxInputPreview.message) attrs.push(`message="${dxInputPreview.message}"`);
	if (dxInputPreview.type !== 'text') attrs.push(`type="${dxInputPreview.type}"`);
	if (dxInputPreview.disabled) attrs.push(`:disabled="true"`);
	if (dxInputPreview.required) attrs.push(`:required="true"`);

	attrs.push(`v-model="value"`);

	return `<DXInput ${attrs.join(' ')} />`;
});
</script>

<template>
	<PreviewBlock title="DXInput"
	              description="A wrapper around <code>DXFloatingLabel</code> that renders a standard input with consistent styling and
			validation state."
	              :inputCode="inputCode"
	              :apiData="apiDXInput"
	              class="mb-8">


		<div class="w-full space-y-4">
			<DXInput
				v-model="dxInputPreview.value"
				:label="dxInputPreview.label"
				:state="dxInputPreview.state"
				:message="dxInputPreview.message"
				:type="dxInputPreview.type"
				:disabled="dxInputPreview.disabled"
				:required="dxInputPreview.required"
			/>

			<div>
				<p class="text-sm text-gray-600">Input Value: {{ dxInputPreview.value }}</p>
			</div>
		</div>

		<template #controls>
			<div class="space-y-4">
				<input v-model="dxInputPreview.label" placeholder="Label" class="input w-full"/>
				<input v-model="dxInputPreview.message" placeholder="Message" class="input w-full"/>
				<select v-model="dxInputPreview.state" class="input w-full">
					<option value="default">Default</option>
					<option value="success">Success</option>
					<option value="error">Error</option>
				</select>
				<input v-model="dxInputPreview.type" placeholder="Type" class="input w-full"/>
				<label><input type="checkbox" v-model="dxInputPreview.disabled"/> Disabled</label>
				<label><input type="checkbox" v-model="dxInputPreview.required"/> Required</label>
			</div>
		</template>
	</PreviewBlock>
</template>

