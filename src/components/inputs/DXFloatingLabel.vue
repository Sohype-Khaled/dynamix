<script setup lang="ts">
import {computed, useAttrs} from 'vue';

// Define component props
interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: any; // optional: only used if you want to pass modelValue to the control slot
}

defineOptions({inheritAttrs: false});

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);


// Access all extra attributes
const attrs = useAttrs();

// Generate a unique ID if none is provided in attrs
const inputId = computed(() => (attrs.id as string) || `input-${Math.random().toString(36).substr(2, 9)}`);

// Compute input styles based on state
const inputClasses = computed(() => {
	const base =
		'block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg border peer appearance-none focus:outline-none focus:ring-0 focus:shadow-none dark:bg-gray-900';

	const stateStyles = {
		default:
			'text-gray-900 border-gray-300 focus:border-primary-600 dark:text-white dark:border-gray-600 dark:focus:border-primary-500',
		success:
			'text-green-600 border-green-500 focus:border-green-600 dark:text-green-400 dark:border-green-500 dark:focus:border-green-400',
		error:
			'text-red-600 border-red-500 focus:border-red-600 dark:text-red-400 dark:border-red-500 dark:focus:border-red-400',
	};

	return `${base} ${stateStyles[props.state || 'default']}`;
});

const hasValue = computed(() => {
	return !!props.modelValue && props.modelValue.toString().trim().length > 0;
});


const labelClasses = computed(() => {
	const base = 'absolute  duration-300 transform left-3 bg-white dark:bg-gray-900';
	const color =
		props.state === 'error'
			? 'text-red-600 dark:text-red-400'
			: props.state === 'success'
				? 'text-green-600 dark:text-green-400'
				: 'text-gray-500 dark:text-gray-400 peer-focus:text-primary-600 peer-focus:dark:text-primary-500';

	const floating = 'top-3 scale-75 -translate-y-6 px-2';
	const placeholderState = 'peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-placeholder-shown:translate-y-0';
	const focusState = 'peer-focus:top-3 peer-focus:px-2 peer-focus:scale-75 peer-focus:-translate-y-6';

	const labelState = hasValue.value
		? floating
		: `${placeholderState} top-3 scale-100 translate-y-0`;

	return `${base} ${labelState} ${focusState} ${color}`;
});

// Compute message color based on state
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
		<div class="flex items-center">
			<!-- Outer Left Slot -->
			<slot name="outer-left"/>

			<div class="relative flex-1">
				<div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
					<!-- Inner Left Slot -->
					<slot name="inner-left"/>
				</div>

				<label :for="inputId" class="" :class="labelClasses">
					{{ label }}
				</label>

				<slot
					name="control"
					:id="inputId"
					:class="['peer w-full', inputClasses]"
					:value="modelValue"
					@input="(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
				/>



				<div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
					<!-- Inner Right Slot -->
					<slot name="inner-right"/>
				</div>
			</div>

			<!-- Outer Right Slot -->
			<slot name="outer-right"/>
		</div>

		<!-- Bottom Slot -->
		<slot name="bottom"/>

		<!-- Message (Error/Success) -->
		<p v-if="message" :class="messageClasses" class="mt-1 text-sm" v-text="message"/>
	</div>
</template>
