<script setup lang="ts">
import type {PaginationProps} from "../../../types/listing.d.ts";
import DXPaginationInfo from "./DXPaginationInfo.vue";
import DXPaginationControls from "./DXPaginationControls.vue";
import DXPaginationSize from "./DXPaginationSize.vue";


defineProps<PaginationProps>();
const emit = defineEmits(["update:page", "update:pageSize"]);

// Compute total pages dynamically


</script>

<template>
	<div class="vue-dynamix flex flex-col md:flex-row justify-between items-center my-4 pt-4">
		<DXPaginationInfo
			:current-page="controls.page"
			:page-size="controls.pageSize"
			:total-items="controls.total"
		/>

		<DXPaginationSize
			v-if="!hidePageSize"
			:page-size="controls.pageSize"
			:page-size-options="pageSizeOptions"
			@update:page-size="emit('update:pageSize', $event)"
		/>

		<DXPaginationControls
			:current-page="controls.page"
			:total-pages="controls.totalPages"
			@update:page="emit('update:page', $event)"
		/>
	</div>
</template>
