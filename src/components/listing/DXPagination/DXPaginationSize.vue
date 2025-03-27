<script setup lang="ts">

import type {PaginationSizeProps} from "../types.ts";

const props = defineProps<PaginationSizeProps>();
const emit = defineEmits(["update:pageSize"]);

// Method to change page size
const setPageSize = (event: Event) => {
	const target = event.target as HTMLSelectElement;
	emit("update:pageSize", parseInt(target.value));
};
</script>

<template>
	<div>
		<select @change="setPageSize"
		        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
		        :value="props.pageSize">
			<option :value="5">5</option>
			<option :value="10">10</option>
			<option :value="25">25</option>
		</select>
	</div>
</template>
