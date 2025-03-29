<script setup lang="ts">

import {ref} from "vue";

const columns = ref([
	{name: 'id', label: 'ID', extraClass: 'w-[20px]'},
	{name: 'name', label: 'Name', extraClass: 'min-w-[200px] max-w-[300px]'},
	{name: 'description', label: 'Description', extraClass: 'min-w-[200px] max-w-[300px]'},
	{name: 'price', label: 'Price', extraClass: 'w-[100px]'},
	{name: 'created_at', label: 'Created At', extraClass: 'w-[100px]'},
])
</script>

<template>
	<DXListing
		list-url="http://localhost:8082/admin/api/v1/services/services"
		axios-config=""
		:columns="columns"
		type="table"/>


</template>

<style scoped>

</style>