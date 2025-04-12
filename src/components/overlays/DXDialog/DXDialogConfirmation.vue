<script setup lang="ts">
import {computed} from "vue";
import DXButton from "@/components/DXButton/DXButton.vue";
import {Icon} from "@iconify/vue";

const props = defineProps({
	severity: {
		type: String,
		default: "danger",
		validator: (value: string) => ["warning", "danger", "info", "success"].includes(value),
	},
	title: {type: String, required: true},
	message: {type: String, required: true},
})

const emit = defineEmits(["confirm", "cancel"]);

const icon = computed(() => ({
	warning: "mdi:alert",
	danger: "mdi:alert-outline",
	info: "mdi:information",
	success: "mdi:check",
}[props.severity] ?? "mdi:alert-circle-outline"))
const color = computed(() => ({
	warning: "text-warning",
	danger: "text-danger",
	info: "text-info",
	success: "text-success",
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
			<Icon
				:icon="icon"
				size="3em"
				:class="[color, 'mx-auto  w-12 h-12']"/>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400" v-text="title"/>
			<p class="mb-5 text-sm text-gray-500 dark:text-gray-400" v-text="message"/>
			<div class="flex gap-2 justify-center">
				<DXButton text severity="danger" @click="emit('cancel')" label="No, cancel"/>
				<DXButton severity="primary" @click="emit('confirm')" label="Yes, Do it"/>
			</div>
		</div>
	</div>
</template>


