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
const inputId = computed(() => (attrs.id as string) || `input-${Math.random().toString(36).slice(2, 11)}`);

const inputClasses = computed(() => {

	const base = "block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-1  appearance-none  focus:outline-none focus:ring-0 peer"

	const stateStyles = {
		default:
			'text-neutral-600 border-neutral-300 focus:border-primary dark:text-neutral-50 dark:border-neutral-600 dark:focus:border-primary-500',
		success:
			'text-success-600 border-success-600 focus:border-success-800 dark:text-success dark:border-success dark:focus:border-success',
		error:
			'text-danger-600 border-danger-600 focus:border-danger dark:text-danger dark:border-danger dark:focus:border-danger',
	};

	return `${base} ${stateStyles[props.state || 'default']}`;
})


const labelClasses = computed(() => {
	const base = `absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[var(--color-background)] dark:bg-[var(--color-background)] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`

	const stateStyles = {
		default:
			'text-neutral-600 dark:text-neutral-50 peer-focus:text-primary peer-focus:dark:text-primary',
		success:
			'text-success-600 dark:text-success',
		error:
			'text-danger-600 dark:text-danger',
	};

	return `${base} ${stateStyles[props.state || 'default']}`;
});

// Compute message color based on state
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
	<div class="w-full space-y-1">
		<!--		<div class="flex items-center">-->
		<!--			&lt;!&ndash; Outer Left Slot &ndash;&gt;-->
		<!--			<slot name="outer-left"/>-->

		<div class="relative ">
			<!--				<div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">-->
			<!--					&lt;!&ndash; Inner Left Slot &ndash;&gt;-->
			<!--					<slot name="inner-left"/>-->
			<!--				</div>-->


			<input
				name="control"
				:id="inputId"
				:class="inputClasses"
				placeholder=" "
				:value="modelValue"
				@input="(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
			/>
			<label :for="inputId" :class="labelClasses">
				{{ label }}
			</label>

			<!--				<div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">-->
			<!--					&lt;!&ndash; Inner Right Slot &ndash;&gt;-->
			<!--					<slot name="inner-right"/>-->
			<!--				</div>-->
		</div>

		<!--			&lt;!&ndash; Outer Right Slot &ndash;&gt;-->
		<!--			<slot name="outer-right"/>-->
		<!--		</div>-->

		<!--		&lt;!&ndash; Bottom Slot &ndash;&gt;-->
		<slot name="bottom"/>

		<!-- Message (Error/Success) -->
		<p v-if="message" :class="messageClasses" v-text="message"/>
	</div>
</template>
