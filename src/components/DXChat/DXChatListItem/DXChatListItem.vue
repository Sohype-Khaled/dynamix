<script setup lang="ts">
import {computed} from "vue";
import {Icon} from "@iconify/vue";
import {useTipTapOutput} from "@/composables/useTipTapOutput.ts";
import DXAvatar from "@/components/DXAvatar.vue";
import {vTimeUpdate} from "@/directives/timeUpdate.ts";
import DXButton from "@/components/DXButton.vue";

// Define the props
const props = withDefaults(defineProps<{
	sentAt: string | Date;
	isClosed: boolean;
	title: string;
	message?: string;
	hasAttachment?: boolean;
	hasAudio?: boolean;
	unseenCount?: number;
	users: Array<any>;
	peers: Array<any>;
	peerNames: string | Array<string>;
	peerImages: Array<{ src: string; alt: string; }>;
	indicator?: boolean;
	indicatorColor?: string;
	indicatorPosition?: string;
	actions?: Array<any>;
}>(), {
	unseenCount: 0
});

const emit = defineEmits<{ (e: 'openRoom'): void }>();


const icon = computed(() => {
	if (props.hasAudio) return 'mdi:microphone';
	if (props.hasAttachment) return 'mdi:paperclip';
	return '';
});

const {content} = useTipTapOutput(props.message ?? '', {
	outputType: 'text',
});

const peerNames = computed(() => {
	return Array.isArray(props.peerNames) ? props.peerNames.join(', ') : props.peerNames;
});

function formatToMMDDYYYY(date: Date): string {
	const mm = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
	const dd = String(date.getDate()).padStart(2, '0');
	const yyyy = date.getFullYear();

	return `${mm}/${dd}/${yyyy}`;
}

function formatOldMessagesOnly(date: Date, now = new Date()): string {
	if (date.toDateString() === now.toDateString()) {
		return date.toLocaleTimeString(undefined, {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
	}
	return formatToMMDDYYYY(date);
}


</script>

<template>
	<div class="relative group cursor-pointer h-[64px]"
	     @click="emit('openRoom')">
		<!-- Overlay -->
		<div
			class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-30 transition-opacity duration-200 pointer-events-none rounded-md">
		</div>

		<div class="flex items-center rounded-md relative z-10 h-full p-[12px] pe-[12px] gap-[12px]">
			<!-- User Image -->
			<div class="w-1/6 flex items-center justify-center">
				<!--				<Tooltip>-->
				<DXAvatar
					sizeClass="w-[48px] h-[48px]"
					:items="peerImages"
					circle
					:grid="peerImages.length > 1"
					:square-container="peerImages.length > 1"
					:indicator="indicator"
					indicator-position="bottom-right"
					:indicator-color="indicatorColor"
				/>
				<!--					<template #content>-->
				<!--						<RoomListItemTooltip :title="title"-->
				<!--						                     :subtitle="content || ''"-->
				<!--						                     :users="toolTipUsers || []"/>-->
				<!--					</template>-->
				<!--				</Tooltip>-->
			</div>

			<!-- Room Details -->
			<div class="w-4/6 max-w-4/6">
				<div class="text-[12px] capitalize grow">
	        <span
		        class="block truncate whitespace-nowrap overflow-hidden w-5/6"
		        :class="[unseenCount > 0 ? 'text-gray-700 font-semibold' : 'text-gray-600 font-medium']"
		        v-text="peerNames"/>

					<h4
						class="leading-[0.9] text-primary truncate whitespace-nowrap overflow-hidden w-full"
						:class="[unseenCount > 0 ? 'font-semibold' : ' font-bold']"
					>Topic: {{ title }}</h4>
				</div>

				<div class="flex items-center justify-between">
					<p
						class="text-[12px] truncate overflow-hidden flex items-center"
						:class="[unseenCount > 0 ? 'text-gray-700 font-semibold' : 'text-gray-500 font-medium']">
						<Icon :icon="icon" class="h-[16px] w-[16px]" v-if="icon"/>
						<span class="whitespace-nowrap truncate w-full">{{ content }}</span>
					</p>
				</div>
			</div>

			<p
				class="absolute top-[12px] right-[12px] font-semibold text-[10px] leading-[0.9] text-gray-600 group-hover:opacity-0 transition-opacity duration-200"
				v-time-update.custom="{datetime: sentAt, format: formatOldMessagesOnly}"/>

			<div
				class="absolute bottom-[12px] right-[12px] flex items-center group-hover:opacity-0 transition-opacity duration-200"
				:class="{
				'': !isClosed
			}">
				<p
					v-if="unseenCount"
					class="inline-flex items-center justify-center w-[20px] h-[20px] text-[10px] font-semibold text-white bg-primary rounded-full leading-none "
					v-text="unseenCount"
				/>
				<Icon icon="mdi:lock-outline" class="h-[20px] w-[20px] text-primary" v-if="isClosed"/>
			</div>
			<DXButton
				v-if="actions && actions.length"
				rounded
				ripple
				text
				severity="primary"
				icon="mdi:dots-horizontal"
				class="opacity-0 group-hover:opacity-100"/>
		</div>
	</div>
</template>


