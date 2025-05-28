<script setup lang="ts">
import {computed} from "vue";
import {Icon} from "@iconify/vue";
import {useTipTapOutput} from "@/composables/useTipTapOutput.ts";
import {vTimeUpdate} from "@/directives/timeUpdate.ts";

const props = defineProps<{
	isSent: boolean;
	username: string;
	content: any;
	sentAt: string | Date;
	state: 'sent' | 'delivered' | 'seen';
}>();


const stateIcon = {
	sent: 'mdi:clock-outline',
	delivered: 'mdi:check',
	seen: 'mdi:check-all',
}
const statusIcon = computed(() => stateIcon[props.state]);

const {content} = useTipTapOutput(props.content, {
	outputType: 'html'
});
</script>

<template>
	<div
		class="flex items-start gap-2.5 mb-2"
		:class="{ 'flex-row-reverse': isSent }"
	>
		<div
			class="flex flex-col w-full max-w-79 leading-1.5 p-2 relative"
			:class="{
        'border-gray/50 bg-gray-50/50 border-1 rounded-e-xl rounded-es-xl': !isSent,
        'border-primary/50 bg-primary/20 border-1 rounded-s-xl rounded-se-xl': isSent,
      }"
		>
		<span
			class="flex items-center text-xs font-semibold capitalize"
			:class="isSent ? 'flex-row-reverse text-primary-700' : 'text-gray-900'"
			v-text="username"/>

			<!-- Dynamically loaded bubble component -->
			<div v-if="content" class="text-xs font-normal mb-2 text-gray-700 max-w-100 break-words whitespace-pre-wrap"
			     v-html="content"/>

			<!--			<BubbleAttachment v-if="message?.attachment_id" :message="message"/>-->
			<span
				class="flex items-center justify-baseline absolute bottom-0.5 left-2.5"
				:class="{ 'text-gray-500': !isSent, 'text-primary': isSent }"
			>
			  <Icon :icon="statusIcon as string" class="w-3 h-3 mr-1"/>
				<span
					class="text-[10px] font-semibold"
					:class="{ 'text-gray-500': !isSent, 'text-primary-500': isSent }"
					v-time-update.time="sentAt"
				/>
			</span>
		</div>

		<!-- Bubble Actions -->
		<!--    <BubbleActions/>-->
	</div>
</template>
