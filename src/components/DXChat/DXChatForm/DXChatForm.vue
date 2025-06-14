<script setup lang="ts">
import {computed, nextTick, reactive, ref} from 'vue'
import DXChatTextInput from "@/components/DXChat/DXChatForm/DXChatTextInput.vue";
import type {ChatFormDataPayload, EditorContentType} from "@/types/chat";
import {Icon} from "@iconify/vue";
import DXRecorderInput from "@/components/DXAudio/DXAudioRecorderInput/DXRecorderInput.vue";
import {vRipple} from "@/directives/ripple";
import {convertBlobToWav} from "@/utils/audio.ts";


const props = withDefaults(defineProps<{
	editorContentType?: EditorContentType;
	isClosed?: boolean;
	uploadEnabled?: boolean;
	recordingEnabled?: boolean;
	handleAudioUpload?: (blob: Blob) => Promise<string>
	replyTo?: string | null;
}>(), {
	editorContentType: 'text',
	isClosed: false,
	uploadEnabled: false,
	handleAudioUpload: undefined
})


const emit = defineEmits<{
	(e: 'typing'): void
	(e: 'submit', data: ChatFormDataPayload): void
	(e: 'reset'): void
}>()

const formData = reactive<ChatFormDataPayload>({
	text: '',
	attachment: '',
	record: null,
	replyTo: props.replyTo ?? null
})

const textInputRef = ref<InstanceType<typeof DXChatTextInput> | null>(null)
const recorderInputRef = ref<InstanceType<typeof DXRecorderInput> | null>(null)

const formType = ref<'text' | 'audio'>('text')
const record = ref<Blob | null>(null)

const hasTextOrAttachment = computed(() => !!formData.text || !!formData.attachment)

const isAudioMode = computed(() => formType.value === 'audio')
const iconName = computed(() => {
	if (formType.value === 'audio') {
		return 'mdi:send'; // Always show send when in audio mode
	}
	return hasTextOrAttachment.value ? 'mdi:send' : 'mdi:microphone';
});

const toggleEmoji = () => (textInputRef.value?.toggleEmoji?.())

const toggleFormType = async () => {
	formType.value = 'audio';
	await nextTick();
	await recorderInputRef.value?.toggle?.();
};

const resetRecorder = async () => {
	formType.value = 'text';
	await nextTick();
	await recorderInputRef.value?.resetRecorder?.();
};

const handleButtonClick = async () => {
	// Case 1: Send if there's text or attachment
	if (hasTextOrAttachment.value) {
		await handleSubmit();
		return;
	}

	// Case 2: If not yet in audio mode, enter it and start recording
	if (formType.value !== 'audio') {
		await toggleFormType();
		return;
	}

	// Case 3: Already in audio mode
	if (recorderInputRef.value?.isRecording || formData.record) {
		await handleSubmit();
	}
};

const typing = () => (emit('typing'))

const handleSubmit = async () => {
	if (!formData.text && !formData.attachment) return;
	emit('submit', formData);
	resetForm();
};

const handleAudioSubmit = async () => {
	if (recorderInputRef.value?.isRecording) {
		recorderInputRef.value.stop?.();
		await nextTick();
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	if (!record.value) return;

	const wavBlob = await convertBlobToWav(record.value);

	if (props.handleAudioUpload) {
		formData.record = await props.handleAudioUpload(wavBlob);
	} else {
		console.warn('No handleAudioUpload() provided');
		formData.record = null;
	}
	emit('submit', formData);
	resetForm();
}

const resetForm = () => {
	formData.text = '';
	formData.attachment = '';
	formData.record = null;
	formData.replyTo = null;
	record.value = null;

	emit('reset');

	if (formType.value === 'text') {
		textInputRef.value?.clearContent();
	}

	if (formType.value === 'audio') {
		recorderInputRef.value?.resetRecorder?.();
		formType.value = 'text';
	}
}
</script>

<template>
	<form @submit.prevent="handleSubmit" v-if="!isClosed" class="vue-dynamix flex flex-col justify-center ">
		<slot name="replyTo"/>
		<div class="flex items-end rounded-lg gap-[2px] p-[2px]">
			<template v-if="formType === 'text'">
				<button
					type="button"
					v-ripple
					class="inline-flex items-center justify-center w-[28px] h-[28px] mb-[4px] rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 text-gray-500 flex-shrink-0"
					@click="toggleEmoji"
				>
					<Icon icon="mdi:paperclip" class="w-5 h-5 rotate-45"/>
				</button>
				<button
					type="button"
					v-ripple
					class="inline-flex items-center justify-center w-[28px] h-[28px] mb-[4px] rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 text-gray-500 flex-shrink-0"
					@click="toggleEmoji"
				>
					<Icon icon="mdi:emoticon-outline" class="w-5 h-5"/>
				</button>
				<DXChatTextInput
					ref="textInputRef"
					aria-label="Message"
					:contentType="editorContentType"
					v-model="formData.text as string"
					@submit="handleSubmit"
					@typing="typing"/>

				<button
					v-ripple
					:type="(hasTextOrAttachment || isAudioMode) ? 'submit' : 'button'"
					class="inline-flex items-center justify-center w-[36px] h-[36px] p-0 rounded-full overflow-hidden cursor-pointer hover:bg-primary-600 text-white bg-primary text-[18px] flex-shrink-0 ms-[2px]"
					@click="handleButtonClick"
				>
					<Icon :icon="iconName" class="w-5 h-5"/>
				</button>
			</template>
			<template v-else>
				<DXRecorderInput
					v-model="record"
					ref="recorderInputRef"
					@reset="resetRecorder"
				/>
				<button
					v-ripple
					type="submit"
					class="inline-flex items-center justify-center w-[36px] h-[36px] p-0 rounded-full overflow-hidden cursor-pointer hover:bg-primary-600 text-white bg-primary text-[18px] flex-shrink-0 ms-[2px]"
					@click="handleAudioSubmit"
				>
					<Icon icon="mdi:send" class="w-5 h-5"/>
				</button>
			</template>
		</div>
	</form>
	<div v-else
	     class="vue-dynamix flex items-center justify-center gap-2 text-xs text-gray-500 px-4 py-2 rounded-md bg-gray-100">
		<Icon icon="mdi:lock-outline" class="w-4 h-4 text-gray-400"/>
		<span>This chat is closed and can no longer accept messages.</span>
	</div>
</template>
