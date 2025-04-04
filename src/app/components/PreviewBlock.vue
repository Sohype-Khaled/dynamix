<script setup lang="ts">
import CodeBlock from "@/app/components/CodeBlock.vue";
import ApiTable from "@/app/components/ApiTable.vue";

defineProps<{ title: string, inputCode?: string, apiData?: any, description?: string }>()
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
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded border border-gray-100">
					<div class="flex rounded items-center justify-center h-full bg-[var(--color-background)] p-5">
						<slot/>
					</div>
					<div class="space-y-4">
						<slot name="controls"/>
					</div>
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
