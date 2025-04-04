<script setup lang="ts">
import {useAttrs} from "vue";
import {useCheckbox} from "./composables/useCheckbox.ts";


const props = defineProps<{ modelValue: any; value?: any; indeterminate?: boolean, id?: string }>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const {isChecked, inputRef, updateValue, uniqueId} = useCheckbox(props, emit);
</script>

<template>
	<input
		ref="inputRef"
		:id="uniqueId"
		type="checkbox"
		:checked="isChecked"
		@change="updateValue"
		v-bind="attrs"
		class="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500
           dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
	/>
</template>
