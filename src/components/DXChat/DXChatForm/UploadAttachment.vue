<!--<script setup lang="ts">-->
<!--import {computed, inject, onMounted, PropType, ref, toRef} from "vue";-->

<!--import axios from "axios";-->

<!--import {Icon} from "@iconify/vue";-->
<!--import {SocketComposable} from "@/types.ts";-->



<!--const props = defineProps({-->
<!--	file: {type: Object as PropType<File>, required: true},-->
<!--	index: {type: Number, required: true}-->
<!--})-->
<!--const emit = defineEmits(['file:delete', 'file:uploaded'])-->


<!--const socket = inject<SocketComposable>('socket');-->
<!--if (!socket) throw new Error('Socket not provided');-->

<!--const room = computed(() => socket?.activeRoom.value)-->
<!--const mediaRecord = ref<string | null>(null)-->
<!--const file = toRef(props.file)-->
<!--const progress = ref(0)-->
<!--const abortController = ref<AbortController | null>(null);-->

<!--const deleteFile = async (index: number) => {-->
<!--	abortController.value?.abort();-->

<!--	await axios.delete(`${storageUrl}/s3/delete/${mediaRecord.value}/`, {-->
<!--		headers: {}-->
<!--	})-->
<!--	mediaRecord.value = null-->
<!--	emit('file:delete', index)-->
<!--}-->

<!--const CHUNK_SIZE = 5 * 1024 * 1024;-->

<!--const storageUrl = import.meta.env.VITE_STORAGE_URL-->

<!--const startUpload = () => {-->
<!--	return axios.post(`${storageUrl}/s3/start/`, {-->
<!--		file_name: file.value.name,-->
<!--		mime_type: file.value.type,-->
<!--		size: file.value.size,-->
<!--		chunk_count: Math.ceil(file.value.size / CHUNK_SIZE),-->
<!--		model_name: "room",-->
<!--		app_label: 'chat',-->
<!--		object_id: room.value?.id,-->
<!--		bucket: "nawahprivateuploads",-->
<!--		is_private: true-->
<!--	}, {headers: {}});-->
<!--}-->

<!--const uploadChunk = async (url: string, chunk: Blob) => {-->
<!--	abortController.value = new AbortController();-->
<!--	const response = await axios.put(url, chunk);-->
<!--	return JSON.parse(response.headers.etag);-->
<!--}-->

<!--const uploadFileInChunks = async (presigned_urls: Array<{-->
<!--	url: string;-->
<!--	part_number: number-->
<!--}>) => {-->
<!--	const completedParts: Array<{ ETag: string; PartNumber: number }> = [];-->
<!--	let totalUploaded = 0;-->

<!--	for (let i = 0; i < presigned_urls.length; i++) {-->
<!--		const {url, part_number} = presigned_urls[i];-->
<!--		const start = i * CHUNK_SIZE;-->
<!--		const end = Math.min(start + CHUNK_SIZE, file.value.size);-->
<!--		const chunk = file.value.slice(start, end);-->

<!--		const ETag = await uploadChunk(url, chunk);-->

<!--		completedParts.push({-->
<!--			ETag,-->
<!--			PartNumber: part_number-->
<!--		});-->
<!--		totalUploaded += chunk.size;-->
<!--		progress.value = Math.min(Math.round((totalUploaded / file.value.size) * 100), 100);-->
<!--	}-->
<!--	return completedParts-->
<!--}-->

<!--const completeUpload = async (mediaId: string, data: {-->
<!--	parts: Array<{ ETag: string; PartNumber: number }>-->
<!--}) => axios.post(`${storageUrl}/s3/complete/${mediaId}/`, data, {headers: {}})-->


<!--onMounted(async () => {-->
<!--	try {-->
<!--		const response = await startUpload();-->
<!--		const {presigned_urls, media_id} = response.data;-->
<!--		mediaRecord.value = media_id;-->
<!--		const completedParts = await uploadFileInChunks(presigned_urls);-->
<!--		await completeUpload(media_id, {parts: completedParts});-->
<!--		emit("file:uploaded", {media_id, index: props.index});-->
<!--	} catch (error) {-->
<!--		if (axios.isCancel(error)) {-->
<!--			console.log("Upload aborted during startUpload or completeUpload.");-->
<!--		} else {-->
<!--			console.error("An error occurred during upload:", error);-->
<!--		}-->
<!--	}-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--	<div-->
<!--		class="flex items-center justify-between p-2 bg-gray-100 rounded-xl"-->
<!--	>-->
<!--    <span class="text-[12px] font-semibold text-gray-900  max-w-100 text-wrap break-words grow"-->
<!--          v-text="file.name"/>-->
<!--		<progress-->
<!--			class="w-[50px] h-[4px] rounded-2xl custom-progress"-->
<!--			:value="progress"-->
<!--			max="100"-->
<!--		/>-->
<!--		<button-->
<!--			@click="deleteFile(index)"-->
<!--			class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50"-->
<!--			type="button">-->

<!--			<Icon icon="close" class="w-4 h-4 text-[#4D4D4D]"/>-->
<!--		</button>-->
<!--	</div>-->
<!--</template>-->

<!--<style scoped>-->
<!--/* Base styling for the progress element */-->
<!--.custom-progress {-->
<!--	width: 50px;-->
<!--	height: 4px;-->
<!--	-webkit-appearance: none; /* Remove default styles for WebKit browsers */-->
<!--	appearance: none;-->
<!--}-->

<!--/* WebKit-specific styles */-->
<!--.custom-progress::-webkit-progress-bar {-->
<!--	background-color: #4D4D4D; /* Default uncompleted color */-->
<!--	border-radius: 2px;-->
<!--}-->

<!--.custom-progress::-webkit-progress-value {-->
<!--	background-color: #FF7A00; /* Active progress color */-->
<!--	border-radius: 2px;-->
<!--	transition: width 0.3s ease; /* Smooth transition */-->
<!--}-->

<!--/* Firefox-specific styles */-->
<!--.custom-progress::-moz-progress-bar {-->
<!--	background-color: #FF7A00; /* Active progress color */-->
<!--	border-radius: 2px;-->
<!--	transition: width 0.3s ease; /* Smooth transition */-->
<!--}-->
<!--</style>-->