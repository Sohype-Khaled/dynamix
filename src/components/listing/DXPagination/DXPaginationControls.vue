<script setup lang="ts">
import {computed} from "vue";
import type {PaginationControlsProps} from "../types.ts";


const props = defineProps<PaginationControlsProps>();
const emit = defineEmits(["update:page"]);

// Computed properties for button states
const isPrevDisabled = computed(() => props.currentPage === 1);
const isNextDisabled = computed(() => props.currentPage === props.totalPages || props.totalPages === 0);

// Generate a smart pagination array
const pageNumbers = computed(() => {
	const pages: (number | "...")[] = [];
	const {currentPage, totalPages} = props;

	if (totalPages <= 7) {
		// Show all pages if 7 or fewer
		for (let i = 1; i <= totalPages; i++) pages.push(i);
	} else {
		pages.push(1, 2, 3);

		if (currentPage > 5) pages.push("...");

		const start = Math.max(4, currentPage - 1);
		const end = Math.min(totalPages - 3, currentPage + 1);

		for (let i = start; i <= end; i++) {
			if (!pages.includes(i)) pages.push(i);
		}

		if (currentPage < totalPages - 4) pages.push("...");

		pages.push(totalPages - 1, totalPages);
	}

	return pages;
});

// Method to update the page
const setPage = (page: number | "...") => {
	if (typeof page === "number" && page >= 1 && page <= props.totalPages) {
		emit("update:page", page);
	}
};
</script>

<template>
	<nav aria-label="Page navigation example">
		<ul class="inline-flex -space-x-px text-base h-10">
			<!-- Previous Button -->
			<li>
				<button
					@click="setPage(props.currentPage - 1)"
					:disabled="isPrevDisabled"
					class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>
			</li>

			<!-- Page Numbers with Ellipsis -->
			<li v-for="page in pageNumbers" :key="page">
				<!-- Numbered Page -->
				<button
					v-if="page !== '...'"
					@click="setPage(page)"
					:class="[
            'flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 dark:border-gray-700',
            props.currentPage === page
              ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
              : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          ]"
				>
					{{ page }}
				</button>

				<!-- Non-Clickable Ellipsis -->
				<button
					v-else
					disabled
					class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
				>
					...
				</button>
			</li>

			<!-- Next Button -->
			<li>
				<button
					@click="setPage(props.currentPage + 1)"
					:disabled="isNextDisabled"
					class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</li>
		</ul>
	</nav>
</template>
