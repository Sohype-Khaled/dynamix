<script setup lang="ts">
import {ref} from 'vue'
import DXChatTextInput from "@/components/DXChat/DXChatForm/DXChatTextInput.vue";
import DXButton from "@/components/DXButton.vue";
import type {EditorContentType} from "@/types/chat";
import {Icon} from "@iconify/vue";

interface ChatFile extends File {
	previewUrl?: string
}

withDefaults(defineProps<{
	editorContentType?: EditorContentType
	isClosed?: boolean,
	uploadEnabled?: boolean
}>(), {
	editorContentType: 'text',
	isClosed: false,
	uploadEnabled: false
})

const emit = defineEmits<{
	(e: 'typing'): void
	(e: 'submit', message: string): void
}>()

const textInputRef = ref<InstanceType<typeof DXChatTextInput> | null>(null)
const message = ref('')
/*
const files = ref<ChatFile[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
*/

const handleSubmit = () => {
	if (!message.value) {
		return
	}
	emit('submit', message.value)
	textInputRef.value?.clearContent()
	message.value = ''
}

// const toggleEmoji = () => {
// 	textInputRef.value?.toggleEmoji?.()
// }
const typing = () => (emit('typing'))
</script>

<template>

	<form @submit.prevent="handleSubmit" v-if="!isClosed">
		<!--	<ChatUploadPreview
				v-if="uploadEnabled"
				:files="files"/>-->

		<div class="flex items-end rounded-lg gap-1.5 p-0.5">
			<!--			<DXButton
							v-if="uploadEnabled"
							class="mb-1.25 rotate-45"
							icon="mdi:paperclip"
							rounded
							size="sm"
							text
							type="button"
							@click="fileInput?.click()"/>
						<input
							v-if="uploadEnabled"
							ref="fileInput"
							type="file"
							class="hidden"
							multiple/>-->


<!--
			<DXButton
				aria-label="Toggle emoji picker"
				text
				rounded
				class="mb-0.75 flex-shrink-0"
				type="button"
				@click="toggleEmoji"
				title="Insert emoji"
				icon="mdi:emoticon-outline"
				size="sm"
			/>
-->


			<DXChatTextInput
				ref="textInputRef"
				aria-label="Message"
				:contentType="editorContentType"
				v-model="message"
				@submit="handleSubmit"
				@typing="typing"/>

			<DXButton
				aria-label="Send message"
				class="mb-0.75 flex-shrink-0"
				icon="mdi:send"
				rounded
				size="sm"
				type="submit"/>
		</div>
	</form>
	<div v-else class="flex items-center justify-center gap-2 text-xs text-gray-500 px-4 py-2 rounded-md bg-gray-100">
		<Icon icon="mdi:lock-outline" class="w-4 h-4 text-gray-400"/>
		<span>This chat is closed and can no longer accept messages.</span>
	</div>
</template>
