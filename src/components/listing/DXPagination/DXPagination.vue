<script setup lang="ts">
import {computed} from "vue";



import type {PaginationProps} from "../types.ts";
import DXPaginationInfo from "./DXPaginationInfo.vue";
import DXPaginationControls from "./DXPaginationControls.vue";
import DXPaginationSize from "./DXPaginationSize.vue";


const props = defineProps<PaginationProps>();
const emit = defineEmits(["update:page", "update:pageSize"]);

// Compute total pages dynamically
const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

// Update page number and emit to parent
const updatePage = (page: number) => {
	emit("update:page", page);
};

// Update page size and reset to first page
const updatePageSize = (size: number) => {
	emit("update:pageSize", size);
	emit("update:page", 1); // Reset page to 1 when changing page size
};
</script>

<template>
	<div class="flex flex-col md:flex-row justify-between items-center my-4 pt-4">
		<!-- Showing results -->
		<DXPaginationInfo
			:currentPage="props.currentPage"
			:pageSize="props.pageSize"
			:totalItems="props.totalItems"
		/>

		<!-- Pagination Controls -->
		<DXPaginationControls
			:currentPage="props.currentPage"
			:totalPages="totalPages"
			@update:page="updatePage"
		/>

		<!-- Page Size Selection -->
		<DXPaginationSize
			:pageSize="props.pageSize"
			@update:pageSize="updatePageSize"
		/>
	</div>
</template>
