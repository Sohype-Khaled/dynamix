<script setup lang="ts">
import DXButton from "@/components/DXButton.vue";
import DXChatContainer from "@/components/DXChat/DXChatLayout/DXChatContainer.vue";
import DXChatLayout from "@/components/DXChat/DXChatLayout/DXChatLayout.vue";
import DXChatForm from "@/components/DXChat/DXChatForm/DXChatForm.vue";
import DXChatBubble from "@/components/DXChat/DXChatBubble/DXChatBubble.vue";
import {ref, type VNodeRef, watch} from "vue";
import {fakeGetRecordById, fakeHandleAudioUpload, generateMockMessages} from "@/app/modules/chat/data.ts";
import {v4 as uuidv4} from 'uuid'
import type {ChatFormDataPayload} from "@/types/chat";
import DXReplyBubble from "@/components/DXChat/DXChatBubble/DXReplyBubble.vue";


type BubbleInstance = InstanceType<typeof DXChatBubble>;


type BubbleRefs = {
	[key: string]: BubbleInstance | null;
};


const isClosed = ref(false)


const messages = ref(generateMockMessages(10))

const chunkUpload = async (file: File) => {
	console.log('Uploading chunk for:', file.name)
	await new Promise((res) => setTimeout(res, 200))
}

const bubbleRefs = ref<BubbleRefs>({});

const layoutRef = ref<InstanceType<typeof DXChatLayout> | null>(null)
const isTyping = ref(false)
const replyTo = ref<Record<string, any> | null>(null)
const replyToId = ref<string | null>(null)

const handleSubmit = (msg: ChatFormDataPayload) => {
	const date = new Date().toISOString();

	messages.value.push({
		id: uuidv4(),
		uuid: uuidv4(),
		created_at: date,
		updated_at: date,
		user_id: "39",
		anonymous_user_id: null,
		room_id: "123",
		sender: {
			id: 39,
			username: "mohamed mohamed"
		},
		seen_at: null,
		isSent: true,
		state: "delivered",
		replyTo: replyToId.value as string,

		// safely transform
		text: msg.text ?? null,
		attachment: null,
		record: msg.record ?? null
	})
}
const typing = () => {
	isTyping.value = true
	setTimeout(() => {
		isTyping.value = false
	}, 1000)
}

const getBubbleRef = (megId: string): VNodeRef => (el: unknown) => {
	bubbleRefs.value[megId] = el as BubbleInstance | null
}


const dblClick = (message: any) => {
	const bubble = bubbleRefs.value[message.id];
	if (!bubble) return;
	replyToId.value = message.id
	replyTo.value = bubble;
}

const handleReset = () => {
	replyTo.value = null
	replyToId.value = null
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
				:ref="getBubbleRef(message.id)"
				:message-id="message.id"
				:username="message.sender.username"
				:record="message.record ?? ''"
				:sent-at="message.created_at"
				:is-sent="message.isSent ?? false"
				:content="message.text"
				:state="message.state as any || 'delivered'"
				:handle-get-audio="fakeGetRecordById"
				@dblclick="dblClick(message)"
				@swipe="dblClick(message)"
			>
				<template #reply v-if="message.replyTo">
					<DXReplyBubble
						@click.stop
						@scrollToReference="bubbleRefs[message.replyTo]?.scrollToSelf?.()"
						:bubble="bubbleRefs[message.replyTo] ?? null"
						class="mb-[6px]"
					/>
				</template>
			</DXChatBubble>

			<template #footer>
				<DXChatForm
					editor-content-type="json"
					:reply-to="replyToId"
					:is-closed="isClosed"
					:handle-audio-upload="fakeHandleAudioUpload"
					@submit="handleSubmit"
					@typing="typing"
					@reset="handleReset"
				>
					<template #replyTo>
						<DXReplyBubble
							v-if="replyTo"
							@scroll-to-reference="bubbleRefs[replyToId as string]?.scrollToSelf?.()"
							@close="replyTo = null; replyToId = null"
							:bubble="replyTo"
							:allow-close="true"/>
					</template>
				</DXChatForm>
			</template>
		</DXChatLayout>
	</DXChatContainer>
</template>

