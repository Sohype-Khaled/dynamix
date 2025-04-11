<script setup lang="ts">

import {ref} from "vue";
import DXTableListing from "@/components/listing/DXTable/DXTableListing.vue";
import axios from "axios";
import {useListing} from "@/components/listing/composables/useListing.ts";

const columns = ref([
	{name: 'id', label: 'ID', extraClass: 'w-[20px]'},
	{name: 'name', label: 'Name', extraClass: 'min-w-[200px] max-w-[300px]'},
	{name: 'category', label: 'Category', extraClass: 'min-w-[200px] max-w-[300px]'},
	{name: 'price', label: 'Price', extraClass: 'w-[100px]'},
	{name: 'created_at', label: 'Created At', extraClass: 'w-[100px]'},
	{name: 'actions', label: 'Actions', extraClass: 'text-right w-[100px]'}

])


const request = (params: any) => axios.get('http://itqadem.example.com/service-reservations/admin/api/v1/services', {params})

const query = ref({
	page: 1,
	pageSize: 10,
	search: "",
})
const {
	items,
	paginationControls,
	loading,
	error,
	updateQuery
} = useListing(request, query);

</script>

<template>
	<DXTableListing
		:columns="columns"
		:pagination-controls="paginationControls"
		:items="items"
		:loading="loading"
		:error="error"
		:query="query"
		@update:query="updateQuery">

		<template #cell-name="{ row }">
			<strong class="text-blue-600">{{ row.translation?.name }}</strong>
		</template>

		<template #cell-actions="{ row }">
			<div class="flex justify-end gap-2">
				<button class="text-blue-600">Edit</button>
				<button class="text-red-600">Delete</button>
			</div>
		</template>
	</DXTableListing>
</template>

