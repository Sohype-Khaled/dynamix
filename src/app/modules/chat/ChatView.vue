<script setup lang="ts">
import {ref} from 'vue';
import DXChatForm from "@/components/DXChat/DXChatForm/DXChatForm.vue";

interface ChatFile extends File {
	previewUrl?: string
}


const handleRecord = () => {
	console.log('Start recording...')
}

const handleFilesUpload = (files: ChatFile[]) => {
	console.log('Files uploaded:', files)
}

const handleRemoveFile = (file: ChatFile) => {
	console.log('File removed:', file.name)
}

// Example uploader (simulate async)
const chunkUpload = async (file: File) => {
	console.log('Uploading chunk for:', file.name)
	await new Promise((res) => setTimeout(res, 200))
}

const isTyping = ref(false)
const messages = ref<string[]>([])
const handleSubmit = (msg: string) => {
	messages.value.push(msg)
}
const typing = () => {
	isTyping.value = true
	setTimeout(() => {
		isTyping.value = false
	}, 1000)
}

</script>

<template>
	<div class="min-h-screen flex flex-col items-start justify-center bg-gray-50 p-8 w-96">
		<ul>
			<li
				v-for="message in messages"
				:key="message"
				class="mb-4"
				v-text="message"
			/>
		</ul>
		<p class="text-base font-semibold mb-8" v-if="isTyping">Typing...👋</p>
		<div class="max-w-xl w-full">
			<DXChatForm
				:external-uploader="chunkUpload"
				@submit="handleSubmit"
				@typing="typing"
			/>
		</div>
	</div>
</template>

