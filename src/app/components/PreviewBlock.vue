<script setup lang="ts">
import CodeBlock from "@/app/components/CodeBlock.vue";
import ApiTable from "@/app/components/ApiTable.vue";
import {computed, useSlots} from "vue";

const props = defineProps<{
	title: string,
	inputCode?: string,
	apiData?: any,
	description?: string
	forceColumnPreview?: boolean
}>()

const slots = useSlots()

const hasDefaultSlot = computed(() => !!slots.default)
const hasControlsSlot = computed(() => !!slots.controls)
const gridClass = computed(() => {
	if (props.forceColumnPreview) return 'grid-cols-1'
	return hasDefaultSlot.value && hasControlsSlot.value
		? 'md:grid-cols-2 grid-cols-1'
		: 'grid-cols-1'
})
</script>

<template>
	<div class="card card--border-none">
		<div class="card-header">
			<h2 class="card-title text-xl">{{ title }}</h2>
		</div>
		<div class="card-body">
			<div class="mb-12">
				<h3 class="text-xl text-neutral-600 dark:text-white font-semibold mb-4">Description</h3>
				<div class="text-neutral dark:text-white" v-if="description" v-html="description"/>
			</div>
			<div class="mb-12">
				<h3 class="text-xl text-neutral-600 dark:text-white font-semibold mb-4">Preview</h3>
				<div class="grid gap-6 p-6 rounded border border-gray-100" :class="gridClass">
					<template v-if="hasDefaultSlot">
						<div class="flex rounded items-center justify-center h-full bg-[var(--color-background)] p-5">
							<slot />
						</div>
					</template>

					<template v-if="hasControlsSlot">
						<div class="space-y-4">
							<slot name="controls" />
						</div>
					</template>
				</div>
			</div>


			<div class="mb-12" v-if="inputCode">
				<h3 class="text-xl text-neutral-600 dark:text-white font-semibold mb-4">Usage Code</h3>
				<CodeBlock :code="inputCode" language="vue"/>
			</div>

			<div v-if="apiData">
				<h3 class="text-xl text-neutral-600 dark:text-white font-semibold mb-4">API Reference</h3>
				<ApiTable :items="apiData"/>
			</div>
		</div>
	</div>
</template>
