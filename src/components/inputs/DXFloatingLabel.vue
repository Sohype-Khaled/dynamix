<script setup lang="ts">
import {computed, useAttrs} from 'vue';

// Define component props
interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: any; // optional: only used if you want to pass modelValue to the control slot
}

defineOptions({ inheritAttrs: false });

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
			'text-gray-900 border-gray-300 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500',
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

// Compute label styles
// const labelClasses = computed(() => {
// 	const base = `absolute text-sm duration-300 transform scale-100 top-1/2 -translate-y-1/2 left-3`;
//
// 	const floating = `peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
// 	peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`;
//
// 	const color =
// 		props.state === 'error'
// 			? 'text-red-600 dark:text-red-400'
// 			: props.state === 'success'
// 				? 'text-green-600 dark:text-green-400'
// 				: 'text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500';
//
// 	return `${base} ${floating} ${color} ${hasValue.value ? 'top-2 scale-75 -translate-y-4' : ''}`;
// });


const labelClasses = computed(() => {
	const base = 'absolute text-sm duration-300 transform left-3';
	const color =
		props.state === 'error'
			? 'text-red-600 dark:text-red-400'
			: props.state === 'success'
				? 'text-green-600 dark:text-green-400'
				: 'text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500';

	const floating = 'top-2 scale-75 -translate-y-4';
	const defaultPosition = 'top-2 scale-100'; // default = not floating

	// Determine label position
	const labelState = hasValue.value
		? floating
		: 'peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-placeholder-shown:translate-y-0 ' + defaultPosition;

	const focusState = 'peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4';

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
	<div class="relative w-full">
		<div class="flex items-center">
			<!-- Outer Left Slot -->
			<slot name="outer-left"/>

			<div class="relative flex-1">
				<div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
					<!-- Inner Left Slot -->
					<slot name="inner-left"/>
				</div>

				<slot
					name="control"
					:id="inputId"
					:class="['peer w-full px-3', inputClasses]"
					:value="modelValue"
					@input="(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
				/>


				<label :for="inputId" class="bg-white dark:bg-gray-900" :class="labelClasses">
					{{ label }}
				</label>

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
