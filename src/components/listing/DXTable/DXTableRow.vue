<script setup lang="ts">
import {computed} from "vue";
import type {RowProps} from "@/components/listing/types.ts";
import DXCheckbox from "@/components/inputs/DXCheckbox.vue";

const props = defineProps<RowProps>();
const emit = defineEmits(['toggle:select']);

const selected = computed({
	get: () => props.isSelected,
	set: (value) => emit('toggle:select', value),
})
</script>

<template>
	<tr
		class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
		<!-- Drag Handle -->
		<td class="flex gap-3 items-center px-2 py-4">
			<span v-if="orderable" class="drag-handle cursor-grab">☰</span>
			<DXCheckbox v-if="selectable" type="checkbox" v-model="selected"/>
		</td>

		<!-- Table Cells -->
		<td v-for="col in columns" :key="col.name" class="px-6 py-4">
			<slot :name="`cell-${col.name}`"
			      :row="row"
			      :column="col">
				{{ row[col.name] }}
			</slot>
		</td>
	</tr>
</template>
