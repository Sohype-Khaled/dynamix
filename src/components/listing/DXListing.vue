<script setup lang="ts">
import DXTable from "@/components/listing/DXTable/DXTable.vue";
import type {ListingProps} from "./types.ts";
import {useListing} from "@/components/listing/composables/useListing.ts";
import {ref} from "vue";
import {DXSearchInput} from "@/components/inputs";
import DXPagination from "@/components/listing/DXPagination/DXPagination.vue";
import {DXButton} from "@/components/DXButton";

const props = withDefaults(defineProps<ListingProps>(), {
	type: "table"
})
const selectedRows = ref<number[]>([]);

const {
	tableData, fetchData, searchQuery, currentPage, pageSize, totalItems,
} = useListing(props.listUrl, props.axiosConfig);

const handleSelectionChange = (selected: number[]) => {
	selectedRows.value = selected;
};

const handleRowOrderChange = (newOrder: { id: number; [key: string]: any }[]) => {
	tableData.value = newOrder;
};
</script>

<template>
	<div class="p-5">
		<div class="flex justify-between items-center mb-5">
			<div class="w-1/3">
				<DXSearchInput v-model="searchQuery" placeholder="Search"/>
			</div>
			<div class="max-w-1/2">
				<slot name="actions"/>
			</div>
		</div>
		<DXTable :rows="tableData"
		         :columns="columns"
		         :selectable="selectable"
		         :selectedRows="selectedRows"
		         :orderable="orderable"
		         v-bind="$slots"
		         @update:selected="handleSelectionChange"
		         @update:rows="handleRowOrderChange"/>

		<DXPagination
			:currentPage="currentPage"
			:pageSize="pageSize"
			:totalItems="totalItems"
			@update:page="currentPage = $event"
			@update:pageSize="pageSize = $event"
		/>
	</div>

</template>

