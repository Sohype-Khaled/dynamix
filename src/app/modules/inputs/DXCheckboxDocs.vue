<script setup lang="ts">
import {computed, reactive} from "vue";
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import DXCheckbox from "@/components/inputs/DXCheckbox.vue";

const apiDXCheckbox = [
	{name: "v-model / modelValue", description: "Two-way binding for the checkbox's value."},
	{name: "value", description: "Optional value when part of a checkbox group."},
	{name: "indeterminate", description: "Sets the checkbox to indeterminate state visually."},
	{name: "id", description: "Optional ID for the checkbox element."},
	{name: "[...attrs]", description: "Any native checkbox attributes like `disabled`, `name`, etc."}
];

const checkboxPreview = reactive({
	value: false,
	indeterminate: false,
	disabled: false,
	name: "agree"
});

const checkboxCode = computed(() => {
	const attrs = [];

	if (checkboxPreview.indeterminate) attrs.push(":indeterminate=\"true\"");
	if (checkboxPreview.disabled) attrs.push(":disabled=\"true\"");
	if (checkboxPreview.name) attrs.push(`name="${checkboxPreview.name}"`);
	attrs.push("v-model=\"value\"");

	return `<DXCheckbox ${attrs.join(" ")} />`;
});
</script>

<template>
	<PreviewBlock
		title="DXCheckbox"
		description="A custom checkbox component that supports controlled value, indeterminate state, and native attributes."
		:inputCode="checkboxCode"
		:apiData="apiDXCheckbox"
		class="mb-8"
	>
		<label class="flex items-center space-x-2">
			<DXCheckbox
				v-model="checkboxPreview.value"
				:indeterminate="checkboxPreview.indeterminate"
				:disabled="checkboxPreview.disabled"
				:name="checkboxPreview.name"
			/>
			<span class="text-sm text-gray-700 dark:text-gray-300">Checkbox Value: {{ checkboxPreview.value }}</span>
		</label>

		<template #controls>
			<div class="space-y-4">
				<label><input type="checkbox" v-model="checkboxPreview.indeterminate"/> Indeterminate</label>
				<label><input type="checkbox" v-model="checkboxPreview.disabled"/> Disabled</label>
				<div>
					<label class="font-semibold">Name</label>
					<input v-model="checkboxPreview.name" type="text" class="input w-full" placeholder="name"/>
				</div>
			</div>
		</template>
	</PreviewBlock>
</template>
