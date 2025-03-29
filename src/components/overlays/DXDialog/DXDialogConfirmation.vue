<script setup lang="ts">
import {computed} from "vue";
import {DXButton} from "@/components/DXButton";

const props = defineProps({
	severity: {
		type: String,
		default: "primary",
		validator: (value: string) => ["warning", "danger", "info", "success"].includes(value),
	},
	message: {type: String, required: true},
})

const emit = defineEmits(["confirm", "cancel"]);

const icon = computed(() => ({
	warning: "info",
	danger: "danger",
	info: "info",
	success: "success",
}[props.severity]))
const color = computed(() => ({
	warning: "text-yellow-500",
	danger: "text-red-500",
	info: "text-blue-500",
	success: "text-green-500",
}[props.severity]))
</script>

<template>
	<div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700  shadow-gray-200">
		<DXButton
			class="absolute top-3 end-2.5"
			text
			severity="secondary"
			icon="close"
			rounded
			@click="emit('cancel')"/>
		<div class="p-4 md:p-5 text-center">
			<Icon v-if="icon"
			      :icon="icon"
			      class="mx-auto mb-4 w-12 h-12"
			      :class="[color, ]"/>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" v-text="message"/>
			<div class="flex gap-2 justify-center">
				<DXButton text severity="danger" @click="emit('cancel')" label="No, cancel"/>
				<DXButton severity="primary" @click="emit('confirm')" label="Yes, Do it"/>
			</div>
		</div>
	</div>
</template>


