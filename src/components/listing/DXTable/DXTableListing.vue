<script setup lang="ts">
import DXTable from "./DXTable.vue";
import type {TableListingProps} from "../types.ts";
import {computed, ref, watch} from "vue";
import DXSearchInput from "@/components/inputs/DXSearchInput.vue";
import DXPagination from "../DXPagination/DXPagination.vue";

const props = defineProps<TableListingProps>()

const emit = defineEmits<{
	(e: 'update:query', value: Record<string, any>): void;
	(e: 'update:items', value: any[]): void; // ✅ Add this
}>();

const selectedRows = ref<number[]>([]);


const handleSelectionChange = (selected: number[]) => {
	selectedRows.value = selected;
};

const handleRowOrderChange = (newOrder: { id: number; [key: string]: any }[]) => {
	emit('update:items', newOrder);
};

const mergedQuery = computed(() => ({
	...props.query,
	page: props.paginationControls.page,
	pageSize: props.paginationControls.pageSize,
	page_size: props.paginationControls.pageSize,
}));


watch(mergedQuery, (params) => {
	emit("update:query", params);
}, {immediate: true});

</script>

<template>
	<div class="p-5">
		<div class="flex justify-between items-center mb-5">
			<div class="w-1/3">
				<DXSearchInput v-model="query.search" placeholder="Search"/>
			</div>
			<div class="max-w-1/2">
				<slot name="actions"/>
			</div>
		</div>
		<DXTable :rows="items"
		         :columns="columns"
		         :selectable="selectable"
		         :selectedRows="selectedRows"
		         :orderable="orderable"
		         v-bind="$slots"
		         @update:selected="handleSelectionChange"
		         @update:rows="handleRowOrderChange">
			<template #header="{ column }">
				<slot name="header" :column="column"/>
			</template>

			<template v-for="col in columns" #[`cell-${col.name}`]="slotProps">
				<slot :name="`cell-${col.name}`" v-bind="slotProps"/>
			</template>
		</DXTable>

		<DXPagination
			hide-page-size
			:controls="paginationControls"
			@update:page="(page) => emit('update:query', { ...query, page })"
			@update:pageSize="(size) => emit('update:query', { ...query, page: 1, pageSize: size })"
		/>
	</div>
</template>

