<script setup lang="ts">
import type {ButtonProps} from "@/components/DXButton/types.ts";
import {computed, useAttrs} from "vue";

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
  label: "",
  href: "",
  icon: "",
  text: false,
  outlined: false,
  rounded: false,
  disabled: false,
  iconPosition: "left",
  severity: "primary",
  size: "base",
});

const attrs = useAttrs();

const buttonClasses = computed(() => [
  "btn",
  "cursor-pointer",
  `btn-${props.severity}`,
  `btn-${props.size}`,
  props.icon ? "btn-icon" : "",
  props.text ? "btn-text" : "",
  props.outlined ? "btn-outlined" : "",
  props.rounded ? "btn-rounded" : "",
  props.disabled ? "btn-disabled" : "",
].filter(Boolean));
</script>

<template>
  <component
      :is="props.as"
      v-bind="attrs"
      :href="props.as === 'a' && !props.disabled ? props.href : undefined"
      :disabled="props.disabled"
      :class="buttonClasses"
  >
    <!-- Left Icon -->
    <!--    <SVGIcon v-if="props.icon && props.iconPosition === 'left'" :icon="props.icon" class="icon"/>-->

    <!-- Button Label -->
    <span v-if="props.label" v-text="props.label"/>

    <!-- Right Icon -->
    <!--    <SVGIcon v-if="props.icon && props.iconPosition === 'right'" :icon="props.icon" class="icon"/>-->
  </component>
</template>



