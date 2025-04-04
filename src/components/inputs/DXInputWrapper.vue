<script setup lang="ts">
import {computed, useAttrs} from 'vue';

interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: any;
}

defineOptions({inheritAttrs: false});

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();

// Generate a unique ID if none is provided in attrs
const inputId = computed(() => (attrs.id as string) || `input-${Math.random().toString(36).slice(2, 11)}`);

const inputClasses = computed(() => {
	const base = "block p-2.5 w-full text-sm rounded-lg border bg-gray-50 dark:bg-gray-700 dark:placeholder-neutral-400"

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
				'text-danger': state === 'error',
				'text-success': state === 'success',
				'text-neutral dark:text-gray-300': !state || state === 'default'
			}">
			{{ label }}
		</label>

		<!-- Input wrapper -->
		<div class="relative flex items-center">
			<slot name="outer-left"/>

			<div class="relative flex-1">
				<!-- Inner left icon -->
				<div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
					<slot name="inner-left"/>
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
					<slot name="inner-right"/>
				</div>
			</div>

			<slot name="outer-right"/>
		</div>

		<!-- Bottom extra -->
		<slot name="bottom"/>

		<!-- Message -->
		<p v-if="message" :class="messageClasses" class="mt-1 text-sm">
			{{ message }}
		</p>
	</div>
</template>
