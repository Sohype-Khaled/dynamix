<script lang="ts" setup>
type ApiItem = {
	name: string
	description: string
}

const props = defineProps<{
	items: ApiItem[]
}>()
</script>

<template>
	<div class="overflow-x-auto rounded border border-gray-200">
		<table class="w-full table-auto text-sm text-left">
			<thead class="bg-gray-100 text-gray-700">
			<tr>
				<th class="px-4 py-3 font-medium">Method / Property</th>
				<th class="px-4 py-3 font-medium">Description</th>
			</tr>
			</thead>
			<tbody class="divide-y divide-gray-100 text-gray-800">
			<tr v-for="item in items" :key="item.name">
				<td class="px-4 py-3 font-mono text-blue-600 whitespace-pre-wrap">
					<code>{{ item.name }}</code>
				</td>
				<td class="px-4 py-3">
					{{ item.description }}
				</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>
