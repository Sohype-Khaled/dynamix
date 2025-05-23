<script setup lang="ts">
import {computed} from "vue";

import type {HeadProps} from "@/types/listing.d.ts";
import DXCheckbox from "@/components/inputs/DXCheckbox.vue";


const props = defineProps<HeadProps>();
const emit = defineEmits(['toggle-select-all']);

const isAllSelected = computed({
	get: () => props.isAllSelected,
	set: (value) => emit('toggle-select-all', value)
});
</script>

<template>
	<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
	<tr>
		<th scope="col" class="flex items-center gap-3 px-2 py-3">
			<span v-if="orderable">☰</span>
			<DXCheckbox v-if="selectable" type="checkbox" v-model="isAllSelected"/>
		</th>
		<th scope="col" v-for="col in columns" :key="col.name" :class="['px-6 py-3', col.extraClass || '']">
			<slot name="header" :column="col">
				{{ col.label }}
			</slot>
		</th>
	</tr>
	</thead>
</template>


