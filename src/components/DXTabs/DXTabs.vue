<script setup lang="ts">
import {ref, watch} from 'vue'
import {vScrollbar} from "@/directives/scrollbar.ts";
import type {ScrollbarSize} from "@/types/scroll";
import {useDynamixOptions} from "@/globals/plugin-symbol.ts";

const props = withDefaults(defineProps<{
	modelValue: string;
	scrollable?: boolean;
	scrollSize?: ScrollbarSize;
	singlePanel?: boolean;
	noStyle?: boolean;
}>(), {
	scrollable: false,
	scrollSize: 'medium',
	noStyle: false
})

const options = useDynamixOptions();
const scrollbarPresets = options?.scrollbarPresets ?? {};

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const activeTab = ref(props.modelValue)
watch(() => props.modelValue, v => activeTab.value = v)

const sectionRefs = ref<Record<string, HTMLElement | null>>({})

function setActiveTab(name: string) {
	activeTab.value = name
	emit('update:modelValue', name)

	if (props.singlePanel && sectionRefs.value[name]) {
		sectionRefs.value[name]!.scrollIntoView({behavior: 'smooth'})
	}
}

function registerTabSection(name: string, el: HTMLElement) {
	sectionRefs.value[name] = el
}
</script>

<template>

	<div
		v-if="props.scrollable"
		:class="[noStyle ? 'vue-dynamix' : 'tabs vue-dynamix']"
		v-scrollbar="{ size: scrollSize, presets: scrollbarPresets }"
	>
		<!-- Provide activeTab and setActiveTab to slot -->
		<slot name="tabs" :activeTab="activeTab" :setActiveTab="setActiveTab"/>
	</div>

	<div v-else :class="[noStyle ? 'vue-dynamix' : 'tabs vue-dynamix']">
		<!-- Provide activeTab and setActiveTab to slot -->
		<slot name="tabs" :activeTab="activeTab" :setActiveTab="setActiveTab"/>
	</div>

	<div class="w-full">
		<slot :activeTab="activeTab" :registerTabSection="registerTabSection"/>
	</div>
</template>


<style scoped>
@import "tailwindcss";

.tabs {
	@apply flex w-full justify-between flex-nowrap;
}

.scroll {
	@apply overflow-x-auto;
}

</style>
