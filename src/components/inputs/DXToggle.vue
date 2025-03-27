<script setup lang="ts">
import {computed, useAttrs} from "vue";
import {useCheckbox} from "@/components/inputs/composables/useCheckbox.ts";

const props = defineProps<{ modelValue: any; value?: any; indeterminate?: boolean; id?: string }>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();


const { isChecked, inputRef, updateValue, uniqueId } = useCheckbox(props, emit);


const isIndeterminate = computed(() => props.indeterminate && !isChecked.value);
</script>

<template>
	<label class="relative inline-flex items-center cursor-pointer">
		<input
			ref="inputRef"
			type="checkbox"
			:checked="isChecked"
			@change="updateValue"
			v-bind="attrs"
			:id="uniqueId"
			class="sr-only peer"
		/>
		<span
			class="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
             rounded-full peer dark:bg-gray-700 transition-all duration-200 ease-in-out"
			:class="{
        'bg-yellow-500': isIndeterminate,
        'peer-checked:bg-blue-600': isChecked,
      }"
		>


      <span
	      class="absolute top-1/2 left-1 w-3 h-3 bg-white border border-gray-600 rounded-full shadow-md transform -translate-y-1/2 transition-all duration-200 ease-in-out"
	      :class="{
          'translate-x-0': !isChecked && !isIndeterminate,
          'translate-x-4': isChecked,
          'left-1/2 -translate-x-1/2': isIndeterminate,
        }"
      ></span>
    </span>
	</label>
</template>
