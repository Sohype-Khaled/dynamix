<script setup lang="ts">
import {computed, reactive} from "vue";
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import {DXToggle} from "@/components/inputs";


const apiDXSwitch = [
	{name: "v-model / modelValue", description: "Two-way binding for the switch state."},
	{name: "indeterminate", description: "Optional indeterminate visual state (middle position)."},
	{name: "value", description: "Optional value if used in a group or custom comparison."},
	{name: "id", description: "Optional id for the internal input."},
	{name: "[...attrs]", description: "Any native input attributes like `disabled`, `name`, etc."}
];

// State for preview
const switchPreview = reactive({
	value: false,
	indeterminate: false,
	disabled: false,
	name: "switch"
});

// Generate live code snippet
const switchCode = computed(() => {
	const attrs = [];

	if (switchPreview.indeterminate) attrs.push(`:indeterminate="true"`);
	if (switchPreview.disabled) attrs.push(`:disabled="true"`);
	if (switchPreview.name) attrs.push(`name="${switchPreview.name}"`);
	attrs.push(`v-model="value"`);

	return `<DXSwitch ${attrs.join(" ")} />`;
});
</script>

<template>
	<PreviewBlock
		title="DXSwitch"
		description="A custom animated toggle switch that supports indeterminate state and native input features."
		:inputCode="switchCode"
		:apiData="apiDXSwitch"
		class="mb-8"
	>
		<label class="flex items-center space-x-2">
			<DXToggle
				v-model="switchPreview.value"
				:indeterminate="switchPreview.indeterminate"
				:disabled="switchPreview.disabled"
				:name="switchPreview.name"
			/>
			<span class="text-sm text-gray-600 dark:text-gray-300">Value: {{ switchPreview.value }}</span>
		</label>

		<template #controls>
			<div class="space-y-4">
				<label><input type="checkbox" v-model="switchPreview.indeterminate"/> Indeterminate</label>
				<label><input type="checkbox" v-model="switchPreview.disabled"/> Disabled</label>
				<div>
					<label class="font-semibold">Name</label>
					<input v-model="switchPreview.name" type="text" class="input w-full" placeholder="name"/>
				</div>
			</div>
		</template>
	</PreviewBlock>
</template>
