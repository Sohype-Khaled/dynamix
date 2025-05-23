<script setup lang="ts">
import {computed} from "vue";
import type {PaginationInfoProps} from "../../../types/listing.d.ts";


const props = defineProps<PaginationInfoProps>();

const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems));
</script>

<template>
	<div class="text-sm text-gray-500 font-medium">
		Showing {{ startItem }} - {{ endItem }} of {{ props.totalItems }}
	</div>
</template>
