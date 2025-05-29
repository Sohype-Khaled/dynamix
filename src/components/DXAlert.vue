<script setup lang="ts">
import {computed, provide, ref} from "vue";
import {Icon} from "@iconify/vue";

interface Props {
	label?: string;
	message?: string; // plain text
	html?: string;    // html content
	icon?: string;
	bordered?: boolean;
	accent?: boolean;
	dismissible?: boolean;
	severity: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

const props = defineProps<Props>();
const visible = ref(true);

const baseColors = {
	primary: ['text-blue-800', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-gray-800', 'border-blue-300', 'dark:border-blue-800'],
	secondary: ['text-gray-800', 'dark:text-gray-300', 'bg-gray-50', 'dark:bg-gray-800', 'border-gray-300', 'dark:border-gray-600'],
	success: ['text-green-800', 'dark:text-green-400', 'bg-green-50', 'dark:bg-gray-800', 'border-green-300', 'dark:border-green-800'],
	danger: ['text-red-800', 'dark:text-red-400', 'bg-red-50', 'dark:bg-gray-800', 'border-red-300', 'dark:border-red-800'],
	warning: ['text-yellow-800', 'dark:text-yellow-400', 'bg-yellow-50', 'dark:bg-gray-800', 'border-yellow-300', 'dark:border-yellow-800'],
	info: ['text-blue-800', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-gray-800', 'border-blue-300', 'dark:border-blue-800'],
	light: ['text-gray-700', 'dark:text-white', 'bg-white', 'dark:bg-gray-800', 'border-gray-200', 'dark:border-gray-700'],
	dark: ['text-gray-800', 'dark:text-gray-300', 'bg-gray-100', 'dark:bg-gray-800', 'border-gray-400', 'dark:border-gray-700'],
};

const severityClass = computed(() => {
	const colors = baseColors[props.severity] || [];
	const [text, darkText, bg, darkBg, border, darkBorder] = colors;

	let borderStyle = '';
	if (props.accent) {
		borderStyle = `border-t-4 ${border} ${darkBorder} rounded-t-none`;
	} else if (props.bordered) {
		borderStyle = `border ${border} ${darkBorder}`;
	}

	return [
		text,
		darkText,
		bg,
		darkBg,
		borderStyle,
	];
});

const iconColorClass = computed(() => {
	return `${baseColors[props.severity]?.[0] || ''} ${baseColors[props.severity]?.[1] || ''}`;
});

function dismiss() {
	visible.value = false;
}
defineExpose({ dismiss });
provide('dismiss', dismiss);
</script>

<template>
	<Transition
		enter-active-class="transition-opacity duration-300"
		enter-from-class="opacity-0"
		leave-active-class="transition-opacity duration-300"
		leave-to-class="opacity-0"
		>
		<div
			v-if="visible"
			class="vue-dynamix flex items-center p-4 mb-4 text-sm rounded-lg"
			:class="severityClass"
			role="alert"
		>
			<Icon v-if="icon"
			      :icon="icon"
			      class="shrink-0 inline w-6 h-6 me-3" />

			<div class="text-sm font-medium">
				<span v-if="label" class="font-medium me-2">{{ label }}</span>

				<slot>
					<!-- Render HTML if provided -->
					<span v-if="html" v-html="html" />
					<!-- Else render plain message -->
					<span v-else-if="message">{{ message }}</span>
				</slot>
			</div>

			<button
				v-if="dismissible"
				@click="visible = false"
				type="button"
				class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 hover:bg-opacity-50 inline-flex items-center justify-center h-8 w-8"
				:class="[
					baseColors[props.severity][2],
					baseColors[props.severity][0],
					baseColors[props.severity][3],
					'focus:ring-opacity-50'
				]"
				aria-label="Close"
			>
				<Icon icon="heroicons:x-mark" class="w-6 h-6 cursor-pointer" :class="iconColorClass" />
				<span class="sr-only">Close</span>
			</button>
		</div>
	</Transition>
</template>


