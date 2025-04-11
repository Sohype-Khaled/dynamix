<script setup lang="ts">
import {computed, ref, useAttrs, watch} from "vue";

interface Props {
	modelValue?: File | File[] | null;
	label?: string;
	message?: string;
	state?: "default" | "success" | "error";
	multiple?: boolean;
	accept?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();


const inputId = computed(() => (attrs.id as string) || `input-${Math.random().toString(36).slice(2, 11)}`);

const inputClasses = computed(() => {
	const base = "block w-full text-sm cursor-pointer rounded-lg border bg-gray-50 dark:bg-gray-700 dark:placeholder-neutral-400"

	const stateStyles = {
		default:
			'text-neutral-600 border-neutral-300 focus:ring-primary focus:border-primary dark:border-neutral-600 dark:text-neutral-50 dark:focus:ring-primary dark:focus:border-primary',
		success:
			'text-success-600 border-success-600 focus:ring-success-800 focus:border-success-800 dark:text-success dark:border-success dark:focus:border-success dark:focus:ring-success',
		error:
			'text-danger-600 border-danger-600 focus:ring-danger-600 focus:border-danger-600 dark:text-danger dark:border-danger dark:focus:border-danger dark:focus:ring-danger',
	};

	return `${base} ${stateStyles[props.state || 'default']}`;
})

const fileInputRef = ref<HTMLInputElement | null>(null);
const previews = ref<string[]>([]);

// Handle file selection
function handleChange(event: Event) {
	const target = event.target as HTMLInputElement;
	const files = target.files;
	if (!files) return;

	const fileList = props.multiple ? Array.from(files) : files[0];
	emit("update:modelValue", fileList);
}

watch(() => props.modelValue, () => {
	previews.value = [];

	const files: File[] = Array.isArray(props.modelValue)
		? props.modelValue
		: props.modelValue
			? [props.modelValue]
			: [];

	files.forEach((file) => {
		if (file.type?.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					previews.value.push(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	});
});



const messageClasses = computed(() => {
	const base = 'text-sm px-2';
	const color = props.state === 'error'
		? 'text-danger-600 dark:text-danger'
		: props.state === 'success'
			? 'text-success-600 dark:text-success'
			: 'text-neutral-600 dark:text-neutral-50';
	return `${base} ${color}`;
});
</script>

<template>
	<div class="space-y-1">
		<label :for="inputId" class="block text-sm font-medium mb-1"
		       :class="{
				'text-danger': state === 'error',
				'text-success': state === 'success',
				'text-neutral dark:text-gray-300': !state || state === 'default'
			}">
			{{ label }}
		</label>
		<input
			ref="fileInputRef"
			type="file"
			:accept="accept"
			:multiple="multiple"
			@change="handleChange"
			class=""
			:class="inputClasses"
		/>

		<p v-if="message" :class="messageClasses" v-text="message"/>

		<div v-if="previews.length" class="mt-2 flex gap-2 flex-wrap">
			<img
				v-for="(src, index) in previews"
				:key="index"
				:src="src"
				class="w-20 h-20 object-cover rounded border"
				alt="Preview"
			/>
		</div>
	</div>
</template>
