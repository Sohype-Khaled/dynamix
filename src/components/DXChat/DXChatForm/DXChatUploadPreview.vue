<script setup lang="ts">

interface ChatFile extends File {
	previewUrl?: string
}
defineProps<{
	files: ChatFile[]
}>()

const emit = defineEmits<{
	(e: 'remove', file: ChatFile): void
}>()
</script>

<template>
	<div v-if="files.length" class="flex flex-wrap gap-2">
		<div
			v-for="(file, index) in files"
			:key="index"
			class="relative w-20 h-20 border rounded bg-gray-100 flex items-center justify-center"
		>
<!--			<img-->
<!--				v-if="file.type.startsWith('image/')"-->
<!--				:src="file.previewUrl || URL.createObjectURL(file)"-->
<!--				class="object-cover w-full h-full rounded"-->
<!--			/>-->
<!--			<div v-else class="text-xs text-center p-2 truncate">{{ // file.name }}</div>-->

			<button
				class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
				@click="emit('remove', file)"
			>
				&times;
			</button>
		</div>
	</div>
</template>
