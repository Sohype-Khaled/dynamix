<script setup lang="ts">
import {nextTick, onMounted, ref, useSlots} from "vue";
import {vScrollbar} from "@/directives/scrollbar.ts";
import type {ChatLayoutProps} from "@/types/chat";
import {useDynamixOptions} from "@/globals/plugin-symbol.ts";

const slots = useSlots();
const props = withDefaults(defineProps<ChatLayoutProps>(), {
	headerContainerClass: '',
	headerContentClass: 'flex items-center justify-between p-4 rounded-2xl',
	headerTitleClass: 'flex items-center gap-2 w-full',
	headerActionsClass: 'flex items-center gap-4',
	footerClass: 'border-t border-gray-50 mt-auto p-4',
	bodyClass: 'flex-1 grow pb-2 px-4 overflow-y-auto',
	scrollable: false,
	scrollSize: 'thin',
	autoScrollOnMount: false
});

const options = useDynamixOptions();
const scrollbarPresets = options?.scrollbarPresets ?? {};

const headerElementRef = ref<HTMLElement | null>(null);
const bodyElementRef = ref<HTMLElement | null>(null);
const footerElementRef = ref<HTMLElement | null>(null);
const userIsScrolling = ref(false);

const onScroll = () => {
	if (bodyElementRef.value) {
		const atBottom =
			bodyElementRef.value.scrollTop +
			bodyElementRef.value.clientHeight >=
			bodyElementRef.value.scrollHeight - 10;

		userIsScrolling.value = !atBottom;
	}
};

const scrollToBottom = async () => {
	if (bodyElementRef.value) {
		await nextTick();
		bodyElementRef.value.scrollTop = bodyElementRef.value.scrollHeight;
	}
};

const updateUserIsScrolling = (value: boolean) => {
	userIsScrolling.value = value;
};

onMounted(() => {
	if (props.autoScrollOnMount) {
		scrollToBottom();
	}
});


defineExpose({
	headerElementRef,
	bodyElementRef,
	footerElementRef,
	userIsScrolling,
	scrollToBottom,
	updateUserIsScrolling
});
</script>

<template>
	<div ref="headerElementRef" :class="[headerContainerClass, 'vue-dynamix']">
		<div :class="[
			headerContentClass,
			slots.subheader ? 'pb-0' : ''
		]">
			<div :class="headerTitleClass">
				<slot name="header-title"/>
			</div>
			<div :class="headerActionsClass">
				<slot name="header-actions"/>
			</div>
		</div>
		<slot name="subheader"/>
	</div>

	<div
		v-if="scrollable"
		ref="bodyElementRef"
		:class="[bodyClass, 'vue-dynamix']"
		v-scrollbar="{ size: scrollSize, presets: scrollbarPresets }"
		@scroll="onScroll"
	>
		<slot/>
	</div>

	<div
		v-else
		ref="bodyElementRef"
		:class="[bodyClass, 'vue-dynamix']"
	>
		<slot/>
	</div>
	<div ref="footerElementRef"
	     v-if="$slots.footer"
	     :class="[footerClass, 'vue-dynamix']">
		<slot name="footer"/>
	</div>
</template>
