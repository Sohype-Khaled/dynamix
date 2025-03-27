<script setup lang="ts">
import {computed, useAttrs} from "vue";

const props = defineProps<{ modelValue: any; value: any }>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const checked = computed(() => JSON.stringify(props.modelValue) === JSON.stringify(props.value));

const updateValue = () => emit("update:modelValue", props.value);
</script>

<template>
  <input
      type="radio"
      :checked="checked"
      @change="updateValue"
      v-bind="attrs"
      class="w-4 h-4 cursor-pointer border-secondary focus:ring-2 focus:ring-primary
           checked:bg-primary checked:border-primary
           dark:border-secondary dark:focus:ring-primary
           dark:checked:bg-primary dark:checked:border-primary"
  />
</template>
