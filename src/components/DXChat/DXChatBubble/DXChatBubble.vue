<script setup lang="ts">
import {computed, nextTick, onMounted, type Ref, ref, watch} from "vue";
import {Icon} from "@iconify/vue";
import {useTipTapOutput} from "@/composables/useTipTapOutput.ts";
import {vTimeUpdate} from "@/directives/timeUpdate.ts";
import DXChatBubbleAudioContent from "@/components/DXChat/DXChatBubble/DXChatBubbleAudioContent.vue";

const props = defineProps<{
	messageId: string;
	isSent: boolean;
	username: string;
	content: any;
	sentAt: string | Date;
	record?: string;
	state: 'sent' | 'delivered' | 'seen';
	handleGetAudio?: (uuid: string) => Promise<Blob>;
}>();

const emit = defineEmits<{
	(e: 'swipe'): void;
}>();

const MIN_SWIPE_DISTANCE = 20;
const MAX_SWIPE_OFFSET = 30;
const swipeOffset = ref(0);
const isDragging = ref(false);
const initialTouchX = ref(0);
const currentTouchX = ref(0);

const rootEl = ref<HTMLElement | null>(null);

const textContentRef = computed(() => props.content ?? '');
const {content} = useTipTapOutput(textContentRef as Ref<string>, {
	outputType: 'html'
});

const {content: textContent} = useTipTapOutput(textContentRef as Ref<string>, {
	outputType: 'text'
});

const stateIcon = {
	sent: 'mdi:clock-outline',
	delivered: 'mdi:check',
	seen: 'mdi:check-all',
}
const statusIcon = computed(() => stateIcon[props.state]);
const audioRef = ref<InstanceType<typeof DXChatBubbleAudioContent> | null>(null);

const expanded = ref(false);
const showToggle = ref(false);
const contentRef = ref<HTMLElement | null>(null);

const lineHeight = 20;
const maxLines = 5;

const textClampClass = computed(() =>
	!expanded.value && showToggle.value ? 'line-clamp-5' : ''
);

function checkOverflow() {
	nextTick(() => {
		const el = contentRef.value;
		if (el) {
			const fullHeight = el.scrollHeight;
			const limitedHeight = lineHeight * maxLines;
			showToggle.value = fullHeight > limitedHeight;
		}
	});
}

function scrollToSelf() {
	nextTick(() => {
		if (rootEl.value) {
			rootEl.value.scrollIntoView({behavior: 'smooth', block: 'center'});
			rootEl.value.classList.add('bg-gray-100');
			setTimeout(() => {
				rootEl.value?.classList.remove('bg-gray-100');
			}, 1200);
		}
	});
}


function getAllowedDirection(): 'ltr' | 'rtl' {
	return props.isSent ? 'rtl' : 'ltr';
}

function handleTouchStart(event: TouchEvent) {
	isDragging.value = true;
	initialTouchX.value = event.touches[0].clientX;
}


function handleTouchMove(event: TouchEvent) {
	if (!isDragging.value) return;
	currentTouchX.value = event.touches[0].clientX;
	let delta = currentTouchX.value - initialTouchX.value;

	const direction = getAllowedDirection();

	if ((direction === 'ltr' && delta < 0) || (direction === 'rtl' && delta > 0)) {
		// 🚫 Block disallowed direction
		swipeOffset.value = 0;
		return;
	}

	// ✅ Clamp based on direction
	swipeOffset.value = Math.abs(delta) > MAX_SWIPE_OFFSET
		? MAX_SWIPE_OFFSET * Math.sign(delta)
		: delta;
}

function handleTouchEnd() {
	isDragging.value = false;

	const direction = getAllowedDirection();
	const validSwipe =
		(direction === 'ltr' && swipeOffset.value > MIN_SWIPE_DISTANCE) ||
		(direction === 'rtl' && swipeOffset.value < -MIN_SWIPE_DISTANCE);

	if (validSwipe) {
		emit('swipe');
	}

	swipeOffset.value = 0;
}

onMounted(checkOverflow);

watch(() => props.content, checkOverflow);


defineExpose({
	messageId: props.messageId,
	isSent: props.isSent,
	isRecord: !!props.record,
	duration: computed(() => audioRef.value?.durationFormatted),
	text: textContent,
	username: props.username,
	scrollToSelf
})
</script>

<template>
	<div
		ref="rootEl"

		class="vue-dynamix flex items-start gap-[10px] p-[4px] mb-[8px] touch-pan-x select-none"
		:class="{ 'flex-row-reverse': isSent }"
	>
		<div
			@touchstart.passive="handleTouchStart"
			@touchmove.passive="handleTouchMove"
			@touchend.passive="handleTouchEnd"
			class="flex flex-col w-full max-w-[316px] leading-[16px] p-[8px] relative transition-transform duration-200 ease-out"
			:class="{
        'border-gray/50 bg-gray-50/50 border-1 rounded-e-[12px] rounded-es-[12px]': !isSent,
        'border-primary/50 bg-primary/20 border-1 rounded-s-[12px] rounded-se-[12px]': isSent,
      }"
			:style="`transform: translateX(${swipeOffset}px)`"
		>
		<span
			class="flex items-center text-[12px] font-semibold capitalize"
			:class="isSent ? 'flex-row-reverse text-primary-700' : 'text-gray-900'"
			v-text="username"/>

			<slot name="reply"/>
			<!-- Dynamically loaded bubble component -->
			<div v-if="content"
			     class="text-[12px] font-normal mb-[8px] text-gray-700 max-w-100 break-words whitespace-pre-wrap">
				<div
					:class="textClampClass"
					v-html="content"
					ref="contentRef"
				/>
				<button
					v-if="showToggle"
					class="text-[10px] font-semibold cursor-pointer mb-[8px]"
					:class="{ 'text-gray-500': !isSent, 'text-primary-500': isSent }"
					@click="expanded = !expanded"
				>
					{{ expanded ? 'Show less' : 'See more' }}
				</button>
			</div>

			<DXChatBubbleAudioContent
				v-if="record"
				:reference="record"
				:is-sent="isSent"
				:handle-get-audio="handleGetAudio"
				ref="audioRef"
			/>

			<!--			<BubbleAttachment v-if="message?.attachment_id" :message="message"/>-->
			<span
				class="flex items-center justify-baseline absolute bottom-[2px] left-[10px]"
				:class="{ 'text-gray-500': !isSent, 'text-primary': isSent }"
			>
			  <Icon :icon="statusIcon as string" class="w-[12px] h-[12px] mr-[4px]"/>
				<span
					class="text-[10px] font-semibold"
					:class="{ 'text-gray-500': !isSent, 'text-primary-500': isSent }"
					v-time-update.time="sentAt"
				/>
			</span>

			<span
				v-if="record && audioRef"
				class="absolute bottom-[2px] right-[16px] text-[10px] font-semibold"
				:class="{ 'text-gray-500': !isSent, 'text-primary': isSent }"
				v-text="audioRef.currentTime > 0 ? audioRef.currentTimeFormatted : audioRef.durationFormatted"
			/>
		</div>

		<!-- Bubble Actions -->
		<!--    <BubbleActions/>-->
	</div>
</template>