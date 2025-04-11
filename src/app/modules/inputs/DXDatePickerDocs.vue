<script setup lang="ts">
import { reactive, computed } from "vue";
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import DXDatePicker from "@/components/inputs/DXDatePicker.vue";

const apiDXDatePicker = [
	{ name: "label", description: "The label shown above the input field." },
	{ name: "state", description: "`'default' | 'success' | 'error'` — visual state for validation feedback." },
	{ name: "message", description: "Helper or validation message displayed under the input." },
	{ name: "v-model / modelValue", description: "Two-way binding for the selected date (format: `yyyy-mm-dd`)." },
	{ name: "[...attrs]", description: "Any native input attributes like `min`, `max`, `required`, `disabled`, etc." },
];

// Reactive state for the preview
const datePickerPreview = reactive({
	value: "",
	label: "Pick a date",
	state: "default" as "default" | "success" | "error",
	message: "",
	min: "2000-01-01",
	max: "2030-12-31",
	required: false,
	disabled: false,
});

// Generate live code snippet
const datePickerCode = computed(() => {
	const attrs = [];

	if (datePickerPreview.label) attrs.push(`label="${datePickerPreview.label}"`);
	if (datePickerPreview.state !== "default") attrs.push(`state="${datePickerPreview.state}"`);
	if (datePickerPreview.message) attrs.push(`message="${datePickerPreview.message}"`);
	if (datePickerPreview.min) attrs.push(`min="${datePickerPreview.min}"`);
	if (datePickerPreview.max) attrs.push(`max="${datePickerPreview.max}"`);
	if (datePickerPreview.required) attrs.push(`:required="true"`);
	if (datePickerPreview.disabled) attrs.push(`:disabled="true"`);
	attrs.push(`v-model="value"`);

	return `<DXDatePicker ${attrs.join(" ")} />`;
});
</script>

<template>
	<PreviewBlock
		title="DXDatePicker"
		description="A styled date input built using <code>DXFloatingLabel</code>. It supports native <code>&lt;input type='date' /&gt;</code> behavior with floating label, validation state, and helper messages."
		:inputCode="datePickerCode"
		:apiData="apiDXDatePicker"
		class="mb-8"
	>
		<div class="w-full space-y-4">
			<DXDatePicker
				v-model="datePickerPreview.value"
				:label="datePickerPreview.label"
				:state="datePickerPreview.state"
				:message="datePickerPreview.message"
				:min="datePickerPreview.min"
				:max="datePickerPreview.max"
				:required="datePickerPreview.required"
				:disabled="datePickerPreview.disabled"
			/>

			<p class="text-sm text-gray-600">Selected Date: {{ datePickerPreview.value || 'None' }}</p>
		</div>

		<template #controls>
			<div class="space-y-4">
				<input v-model="datePickerPreview.label" placeholder="Label" class="input w-full" />
				<input v-model="datePickerPreview.message" placeholder="Message" class="input w-full" />
				<select v-model="datePickerPreview.state" class="input w-full">
					<option value="default">Default</option>
					<option value="success">Success</option>
					<option value="error">Error</option>
				</select>
				<div class="grid grid-cols-2 gap-2">
					<input v-model="datePickerPreview.min" type="date" class="input w-full" placeholder="Min date" />
					<input v-model="datePickerPreview.max" type="date" class="input w-full" placeholder="Max date" />
				</div>
				<label><input type="checkbox" v-model="datePickerPreview.required" /> Required</label>
				<label><input type="checkbox" v-model="datePickerPreview.disabled" /> Disabled</label>
			</div>
		</template>
	</PreviewBlock>
</template>
