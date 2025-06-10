<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {computed} from "vue";
import {vRipple} from "@/directives/ripple";
import type {BubbleInstance} from "@/types/chat.d";

const props = withDefaults(defineProps<{
	bubble: BubbleInstance | null;
	allowClose?: boolean;
}>(), {
	allowClose: false
});

const emit = defineEmits<{
	(e: 'close'): void;
	(e: 'scrollToReference'): void
}>();

const content = computed(() => props.bubble.isRecord ? props.bubble.duration : props.bubble.text);
</script>

<template>
	<div
		@click="emit('scrollToReference')"
		class="flex items-center justify-between border-l-[6px] border-y-1 border-r-1 border-gray-200 p-[8px] mb-[4px] rounded w-full cursor-pointer">
		<div class="flex-1 max-w-[250px]">
			<div
				class="text-[12px] font-semibold capitalize"
				:class="bubble.isSent ? 'flex-row-reverse text-primary-700' : 'text-gray-900'"
				v-text="bubble.username"/>
			<div class="flex items-center">
				<Icon v-if="bubble.isRecord" icon="mdi:microphone" class="w-4 h-4  text-gray-600"/>
				<div v-text="content"
				     class="text-[12px] font-normal text-gray-500 truncate max-w-full"/>
			</div>
		</div>

		<button
			v-if="allowClose"
			v-ripple
			type="button"
			class="flex items-center justify-center w-[28px] h-[28px] rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 text-gray-500 flex-shrink-0"
			@click.prevent="emit('close')"
		>
			<Icon icon="mdi:close" class="w-4 h-4  text-gray-600"/>
		</button>
	</div>
</template>

