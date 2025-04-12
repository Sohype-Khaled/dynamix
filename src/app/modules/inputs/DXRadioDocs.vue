<script setup lang="ts">
import { reactive, computed } from "vue";
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import DXRadio from "@/components/inputs/DXRadio.vue";

const apiDXRadio = [
	{ name: "v-model / modelValue", description: "Two-way binding for the selected value." },
	{ name: "value", description: "The unique value for this radio input." },
	{ name: "[...attrs]", description: "Any native input attributes like `name`, `disabled`, etc." },
];

// Preview state
const radioPreview = reactive({
	selected: 'option1',
	name: 'radio-group',
	disabled: false,
});

// Generate code snippet dynamically
const radioCode = computed(() => {
	const baseAttrs = [
		`v-model="selected"`,
		`name="${radioPreview.name}"`,
	];
	if (radioPreview.disabled) baseAttrs.push(`:disabled="true"`);

	return `
<DXRadio value="option1" ${baseAttrs.join(" ")} />
<DXRadio value="option2" ${baseAttrs.join(" ")} />`.trim();
});
</script>

<template>
	<PreviewBlock
		title="DXRadio"
		description="A styled radio input component with v-model support and full customization via native attributes."
		:inputCode="radioCode"
		:apiData="apiDXRadio"
		class="mb-8"
	>
		<div class="space-y-2">
			<div class="flex items-center space-x-2">
				<DXRadio
					v-model="radioPreview.selected"
					:value="'option1'"
					:name="radioPreview.name"
					:disabled="radioPreview.disabled"
				/>
				<label class="text-sm">Option 1</label>
			</div>
			<div class="flex items-center space-x-2">
				<DXRadio
					v-model="radioPreview.selected"
					:value="'option2'"
					:name="radioPreview.name"
					:disabled="radioPreview.disabled"
				/>
				<label class="text-sm">Option 2</label>
			</div>
			<p class="text-sm text-gray-600">Selected: {{ radioPreview.selected }}</p>
		</div>

		<template #controls>
			<div class="space-y-4">
				<input v-model="radioPreview.name" type="text" placeholder="Group Name" class="input w-full" />
				<label><input type="checkbox" v-model="radioPreview.disabled" /> Disabled</label>
			</div>
		</template>
	</PreviewBlock>
</template>
