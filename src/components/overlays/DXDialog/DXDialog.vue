<script setup lang="ts">
import {DXButton} from "@/components/DXButton";

defineProps<{ title?: string }>();

const emit = defineEmits(['close'])
</script>

<template>
	<div class="relative p-4 w-full max-w-2xl max-h-full">
		<!-- Modal content -->
		<div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
			<!-- Modal header -->
			<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
					{{ title }}
				</h3>
				<DXButton
					icon="close"
					rounded
					severity="secondary"
					text
					@click="emit('close')"
				/>
			</div>
			<slot></slot>
		</div>
	</div>
</template>


