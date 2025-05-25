<script setup lang="ts">

import {ref} from "vue";
import DXButton from "@/components/DXButton/DXButton.vue";
import type {ButtonProps} from "@/types/button";

const buttons = ref<Array<Partial<ButtonProps>>>([
	{label: 'Primary', severity: 'primary'},
	{label: 'Secondary', severity: 'secondary'},
	{label: 'Success', severity: 'success'},
	{label: 'Info', severity: 'info'},
	{label: 'Warning', severity: 'warning'},
	{label: 'Danger', severity: 'danger'},
]);

const sizes = ref<Array<Partial<ButtonProps>>>([
	{label: 'Extra Small', size: 'xs'},
	{label: 'Small', size: 'sm'},
	{label: 'Base', size: 'base'},
	{label: 'Large', size: 'lg'},
	{label: 'Extra Large', size: 'xl'},
]);
</script>

<template>
	<h2>Default Buttons</h2>
	<div class="w-full flex flex-wrap gap-2">
		<DXButton
			v-for="button in buttons"
			:key="button.label"
			:label="button.label"
			:severity="button.severity"
		/>
	</div>

	<h2>Text Buttons</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="(size, index) in sizes"
			:key="size.label"
			:size="size.size"
			text
			:label="size.label"
		/>
	</div>

	<h2>Outlined Buttons</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="(size, index) in sizes"
			:key="size.label"
			:size="size.size"
			outlined
			:label="size.label"
		/>
	</div>

	<h2>Buttons Sizes</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="size in sizes"
			:key="size.label"
			:label="size.label"
			:size="size.size"
		/>
	</div>

	<h2>Buttons with Icons</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="(size, index) in sizes"
			:key="size.label"
			:label="size.label"
			:size="size.size"
			icon="mdi:home"
			:iconPosition="index % 2 === 0 ? 'left' : 'right'"
		/>
	</div>

	<h2>Icon Buttons</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="(size, index) in sizes"
			:key="size.label"
			:size="size.size"
			icon="mdi:home"
			:rounded="true"
			:outlined="index % 2 === 0"
		/>
	</div>



	<h2>Disabled Buttons</h2>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			v-for="button in buttons"
			:key="button.label"
			:label="button.label"
			:severity="button.severity"
			:disabled="true"
		/>
	</div>

	<h3>Loading</h3>
	<div class="w-full flex flex-wrap items-center gap-2">
		<DXButton
			label="Loading..."
			severity="primary"
			:loading="true"
		/>
		<DXButton
			label="Loading..."
			severity="primary"
			icon="mdi:home"
			:loading="true"
		/>
		<DXButton
			label="Loading..."
			severity="primary"
			icon="mdi:home"
			iconPosition="right"
			:loading="true"
		/>
	</div>
</template>

