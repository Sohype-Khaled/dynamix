<script setup lang="ts">
import {ref} from 'vue'
import DXChatTextInput from "@/components/DXChat/DXChatForm/DXChatTextInput.vue";
import DXButton from "@/components/DXButton.vue";
import type {EditorContentType} from "@/types/chat";

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
	emit('submit', message.value)
	textInputRef.value?.clearContent()
}

const typing = () => (emit('typing'))
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<!--	<ChatUploadPreview
				v-if="uploadEnabled"
				:files="files"/>-->

		<div class="flex items-end rounded-lg gap-0.5  p-0.5">
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

			<DXChatTextInput
				ref="textInputRef"
				:contentType="editorContentType"
				v-model="message"
				@submit="handleSubmit"
				@typing="typing"/>

			<DXButton
				class="mb-1.25"
				icon="mdi:send"
				rounded
				size="sm"
				text
				type="submit"/>
		</div>
	</form>
</template>
