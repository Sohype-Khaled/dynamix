<script setup lang="ts">

import {computed} from "vue";

interface ChatContainerProps {
	extraClass?: string | Array<string>;
}

const props = withDefaults(
	defineProps<ChatContainerProps>(), {
		extraClass: '',
	},
);

const extraClasses = computed(() => {
	return Array.isArray(props.extraClass)
		? props.extraClass.join(' ')
		: props.extraClass;
});
</script>

<template>
	<div
		class="dx-chat-container"
		:class="[
        'flex flex-col overflow-hidden',
        'transition-all duration-300 ease-in-out',
				extraClasses
      ]"
	>
		<slot></slot>
	</div>
</template>

<style scoped>
@import "tailwindcss";

.dx-chat-container {
	@apply bg-white shadow-lg border border-gray-50 rounded-2xl;
}
</style>