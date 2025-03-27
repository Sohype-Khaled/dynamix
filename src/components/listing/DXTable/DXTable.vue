<script setup lang="ts">
import {computed} from "vue";
import type {TableColumn, TableProps} from "@/components/listing/types.ts";


import draggable from "vuedraggable";
import {useSelection} from "@/composables/useSelection.ts";
import DXTableHead from "@/components/listing/DXTable/DXTableHead.vue";
import DXTableRow from "@/components/listing/DXTable/DXTableRow.vue";

const props = defineProps<TableProps>();
const emit = defineEmits(['update:selected', 'update:rows']);


const {toggleSelection, selectAll, isSelected, isAllSelected, isIndeterminate} = useSelection(
    props.rows,
    props.selectionKey
);
const tableColumns = computed<TableColumn[]>(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns;
  }
  if (props.rows.length > 0) {
    return Object.keys(props.rows[0]).map((key) => ({label: key, name: key,})) as TableColumn[];
  }
  return [];
});


const onDragEnd = () => (emit('update:rows', props.rows));

</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <!-- Table Header -->
      <DXTableHead :columns="tableColumns"
                   :selectable="selectable"
                   :orderable="orderable"
                   :isAllSelected="isAllSelected"
                   :isIndeterminate="isIndeterminate"
                   @toggle-select-all="selectAll"
      >
        <template #header="{ column }">
          <slot name="header" :column="column"></slot>
        </template>
      </DXTableHead>

      <!-- Draggable Body -->
      <draggable
          tag="tbody"
          :list="rows"
          item-key="id"
          ghost-class="ghost"
          handle=".drag-handle"
          @end="onDragEnd">
        <template #item="{ element: row }">
          <DXTableRow
              :row="row"
              :columns="tableColumns"
              :selectable="selectable"
              :orderable="orderable"
              :isSelected="isSelected(row)"
              @toggle:select="toggleSelection"
          >
            <template v-for="col in tableColumns" #[`cell-${col.name}`]="slotProps">
              <slot :name="'cell-' + col.name" v-bind="slotProps"></slot>
            </template>
          </DXTableRow>
        </template>
      </draggable>
    </table>
  </div>
</template>


<!--<style>-->
<!--.ghost {-->
<!--  @apply opacity-90 scale-105 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl;-->
<!--}-->

<!--.deleting {-->
<!--  @apply opacity-50 transition-opacity duration-300 pointer-events-none;-->
<!--}-->
<!--</style>-->