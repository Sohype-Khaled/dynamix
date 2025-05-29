<script setup lang="ts">
import DXButton from "@/components/DXButton.vue";
import DXChatContainer from "@/components/DXChat/DXChatLayout/DXChatContainer.vue";
import DXChatLayout from "@/components/DXChat/DXChatLayout/DXChatLayout.vue";
import DXChatForm from "@/components/DXChat/DXChatForm/DXChatForm.vue";
import DXChatBubble from "@/components/DXChat/DXChatBubble/DXChatBubble.vue";
import {ref, watch} from "vue";
import {messages as msgs} from "@/app/modules/chat/bubbles.ts";

interface ChatFile extends File {
	previewUrl?: string
}

const isClosed = ref(false)
const handleRecord = () => {
	console.log('Start recording...')
}

const handleFilesUpload = (files: ChatFile[]) => {
	console.log('Files uploaded:', files)
}

const handleRemoveFile = (file: ChatFile) => {
	console.log('File removed:', file.name)
}

const messages = ref([...msgs])
// Example uploader (simulate async)
const chunkUpload = async (file: File) => {
	console.log('Uploading chunk for:', file.name)
	await new Promise((res) => setTimeout(res, 200))
}
const layoutRef = ref<InstanceType<typeof DXChatLayout> | null>(null)
const isTyping = ref(false)

function createRandomKey(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

const handleSubmit = (msg: string) => {
	const date = new Date().toISOString();
	messages.value.push({
		"id": createRandomKey(),
		"uuid": createRandomKey(),
		"attachment_id": null,
		"record": null,
		"text": msg,
		"created_at": date,
		"updated_at": date,
		"user_id": "39",
		"anonymous_user_id": null,
		"room_id": "123",
		"sender": {"id": 39, "username": "mohamed mohamed"},
		"seen_at": null,
		"isSent": true,
		"state": "delivered"
	})
}
const typing = () => {
	isTyping.value = true
	setTimeout(() => {
		isTyping.value = false
	}, 1000)
}
watch(() => messages.value.length, () => {
	if (!layoutRef.value?.userIsScrolling) layoutRef.value?.scrollToBottom();
});
</script>

<template>
	<DXChatContainer extraClass="w-96 h-[35rem]">
		<DXChatLayout scrollable auto-scroll-on-mount ref="layoutRef">
			<template #header-title>
				<DXButton size="sm" icon="mdi:arrow-left"/>
				<div class="flex flex-col items-start"><h3 class="text-sm font-normal leading-4 text-primary">Customer
					Support</h3><span class="font-semibold text-xs text-gray-700">Hello </span></div>
			</template>
			<template #header-actions>

				<DXButton icon="mdi:lock-outline"
				          size="sm"
				          text
				          serverity="secondary"
				          @click="isClosed = !isClosed"/>
				<DXButton
					size="sm"
					text
					severity="primary"
					icon="mdi:arrow-collapse"/>
				<DXButton size="sm" icon="mdi:close"/>
			</template>
			<p class="text-base font-semibold mb-8"><span v-if="isTyping">Typing...👋</span></p>

			<DXChatBubble
				v-for="message in messages"
				:key="message.uuid"
				:username="message.sender.username"
				:sent-at="message.created_at"
				:is-sent="message.isSent?? false"
				:content="message.text"
				:state="message.state as any || 'delivered'"
			/>
			<template #footer>
				<DXChatForm
					editor-content-type="json"
					:is-closed="isClosed"
					:external-uploader="chunkUpload"
					@submit="handleSubmit"
					@typing="typing"
				/>
			</template>
		</DXChatLayout>
	</DXChatContainer>
</template>

