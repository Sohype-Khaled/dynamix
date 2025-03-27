<script setup lang="ts">
import { computed, useAttrs } from 'vue';

interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: any;
}

defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();

const inputId = computed(() => (attrs.id as string) || `input-${Math.random().toString(36).substr(2, 9)}`);

const inputClasses = computed(() => {
	const base =
		'block w-full px-2.5 py-2 text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 dark:bg-gray-900';

	const stateStyles = {
		default:
			'text-gray-900 border-gray-300 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500',
		success:
			'text-green-600 border-green-500 focus:border-green-600 dark:text-green-400 dark:border-green-500 dark:focus:border-green-400',
		error:
			'text-red-600 border-red-500 focus:border-red-600 dark:text-red-400 dark:border-red-500 dark:focus:border-red-400',
	};

	return `${base} ${stateStyles[props.state || 'default']}`;
});

const messageClasses = computed(() => {
	return props.state === 'error'
		? 'text-red-600 dark:text-red-400'
		: props.state === 'success'
			? 'text-green-600 dark:text-green-400'
			: 'text-gray-500 dark:text-gray-400';
});
</script>

<template>
	<div class="w-full">
		<!-- Fixed Label -->
		<label :for="inputId" class="block text-sm font-medium mb-1"
		       :class="{
				'text-red-600 dark:text-red-400': state === 'error',
				'text-green-600 dark:text-green-400': state === 'success',
				'text-gray-700 dark:text-gray-300': !state || state === 'default'
			}">
			{{ label }}
		</label>

		<!-- Input wrapper -->
		<div class="relative flex items-center">
			<slot name="outer-left" />

			<div class="relative flex-1">
				<!-- Inner left icon -->
				<div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
					<slot name="inner-left" />
				</div>

				<!-- Input or custom field -->
				<slot
					name="control"
					:id="inputId"
					:class="['px-2', inputClasses]"
					:value="modelValue"
					@input="(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
				/>

				<!-- Inner right icon -->
				<div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
					<slot name="inner-right" />
				</div>
			</div>

			<slot name="outer-right" />
		</div>

		<!-- Bottom extra -->
		<slot name="bottom" />

		<!-- Message -->
		<p v-if="message" :class="messageClasses" class="mt-1 text-sm">
			{{ message }}
		</p>
	</div>
</template>
