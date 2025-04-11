<script setup lang="ts">
import {computed, reactive} from "vue";
import PreviewBlock from "@/app/components/PreviewBlock.vue";
import DXFileInput from "@/components/inputs/DXFileInput.vue";


const apiDXFileUploadWithPreview = [
	{name: "label", description: "The label displayed above the input."},
	{name: "state", description: "`'default' | 'success' | 'error'` — changes visual style."},
	{name: "message", description: "A helper or validation message displayed below the input."},
	{name: "v-model / modelValue", description: "Selected file(s) as a `File` or `File[]`."},
	{name: "multiple", description: "Enable selecting multiple files."},
	{name: "accept", description: "Limit accepted file types, e.g. `image/*`, `.pdf`, etc."},
];

const filePreview = reactive({
	value: null as File | File[] | null,
	label: "Upload your image",
	message: "",
	state: "default" as "default" | "success" | "error",
	multiple: true,
	accept: "image/*",
});

const codeExample = computed(() => {
	const attrs = [];

	if (filePreview.label) attrs.push(`label="${filePreview.label}"`);
	if (filePreview.message) attrs.push(`message="${filePreview.message}"`);
	if (filePreview.state !== "default") attrs.push(`state="${filePreview.state}"`);
	if (filePreview.multiple) attrs.push(`:multiple="true"`);
	if (filePreview.accept) attrs.push(`accept="${filePreview.accept}"`);

	attrs.push(`v-model="value"`);

	return `<DXFileInput ${attrs.join(" ")} />`;
});
</script>

<template>
	<PreviewBlock
		title="DXFileUploadWithPreview"
		description="A custom file input component with image preview support, styled with Tailwind and fully reactive."
		:inputCode="codeExample"
		:apiData="apiDXFileUploadWithPreview"
		class="mb-8"
	>
		<div class="w-full space-y-4">
			<DXFileInput
				v-model="filePreview.value"
				:label="filePreview.label"
				:message="filePreview.message"
				:state="filePreview.state"
				:multiple="filePreview.multiple"
				:accept="filePreview.accept"
			/>

			<p class="text-sm text-gray-600">
				Selected:
				<span v-if="Array.isArray(filePreview.value)">
          {{ filePreview.value.map(f => f.name).join(', ') || 'None' }}
        </span>
				<span v-else>
          {{ filePreview.value?.name || 'None' }}
        </span>
			</p>
		</div>

		<template #controls>
			<div class="space-y-4">
				<input v-model="filePreview.label" placeholder="Label" class="input w-full"/>
				<input v-model="filePreview.message" placeholder="Message" class="input w-full"/>
				<select v-model="filePreview.state" class="input w-full">
					<option value="default">Default</option>
					<option value="success">Success</option>
					<option value="error">Error</option>
				</select>
				<input v-model="filePreview.accept" placeholder="Accept" class="input w-full"/>
				<label><input type="checkbox" v-model="filePreview.multiple"/> Multiple</label>
			</div>
		</template>
	</PreviewBlock>
</template>
