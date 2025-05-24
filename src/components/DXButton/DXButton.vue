<script setup lang="ts">
import type {ButtonProps} from "@/types/button.d.ts";
import {computed, useAttrs} from "vue";
import {Icon} from "@iconify/vue";

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

const severityClasses = computed(() => [
	"btn-primary",
	"btn-secondary",
	"btn-success",
	"btn-info",
	"btn-warning",
	"btn-danger",
].includes(props.severity) ? `btn-${props.severity}` : "");

const buttonClasses = computed(() => [
	"btn",
	`btn-${props.severity}`,
	`btn-${props.size}`,
	props.icon ? "btn-icon" : "",
	props.text ? "btn-text" : "",
	props.outlined ? "btn-outline" : "",
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
		<Icon
			v-if="props.icon && props.iconPosition === 'left'"
			:icon="props.icon"
			class="btn-local-icon"
		/>

		<template v-if="props.label">{{label}}</template>

		<Icon
			v-if="props.icon && props.iconPosition === 'right'"
			:icon="props.icon"
			class="btn-local-icon"
		/>
	</component>
</template>


<style scoped>
@import "./button.css";
</style>

