<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
	<div class="card">
		<div class="card-header">
			<div class="card-title">{{ title }}</div>
		</div>
		<div class="card-body">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
				<div class="flex items-center justify-center h-full bg-[var(--color-background)] p-5">
					<slot/>
				</div>
				<div class="space-y-4">
					<slot name="controls"/>
				</div>
			</div>
		</div>
	</div>
</template>
