<script setup lang="ts">
import {computed, useAttrs} from "vue";

const props = defineProps<{ modelValue: any; value: any }>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const checked = computed(() => JSON.stringify(props.modelValue) === JSON.stringify(props.value));

const updateValue = () => emit("update:modelValue", props.value);
</script>

<template>
	<input
		type="radio"
		:checked="checked"
		@change="updateValue"
		v-bind="attrs"
		class="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
	/>
</template>
