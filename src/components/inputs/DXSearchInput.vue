<script setup lang="ts">
import {useAttrs} from 'vue';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
const attrs = useAttrs();
</script>

<template>
	<div class="vue-dynamix relative w-full">
		<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			<slot name="left-icon"></slot>
		</div>
		<input
			v-bind="attrs"
			:value="modelValue"
			@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		/>
		<button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
			<slot name="right-icon"></slot>
		</button>
	</div>
</template>
