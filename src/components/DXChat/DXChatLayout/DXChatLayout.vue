<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import type {ChatLayoutProps} from "@/types/chat";


const props = withDefaults(defineProps<ChatLayoutProps>(), {
	headerContainerClass: '',
	headerContentClass: 'flex items-center justify-between p-4 rounded-2xl h-20',
	headerTitleClass: 'flex items-center gap-2 w-full',
	headerActionsClass: 'flex items-center gap-4',
	footerClass: 'border-t border-gray-50 mt-auto p-4',
	bodyClass: 'app-body flex-1 grow p-4 overflow-y-auto',
	scrollable: false,
	scrollSize: 'thin',
	autoScrollOnMount: false
});

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
	<div ref="headerElementRef" :class="headerContainerClass">
		<div :class="headerContentClass">
			<div :class="headerTitleClass">
				<slot name="header-title"/>
			</div>
			<div :class="headerActionsClass">
				<slot name="header-actions"/>
			</div>
		</div>
		<slot name="subheader"/>
	</div>

	<div ref="bodyElementRef" :class="[
				bodyClass,
				scrollable ? 'scroll' : '',
				scrollSize ? `scroll-${scrollSize}` : '',
			]"
	     @scroll="onScroll">
		<slot/>
	</div>
	<div ref="footerElementRef" :class="footerClass">
		<slot name="footer"/>
	</div>
</template>
