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
		v-bind="$attrs"
		:class="[noStyle ? 'vue-dynamix' : 'tabs vue-dynamix', scrollable ? 'relative' : '']"
		v-scrollbar="scrollable ? { size: scrollSize, presets: scrollbarPresets } : undefined"
	>
		<slot name="tabs" :activeTab="activeTab" :setActiveTab="setActiveTab"/>
	</div>

	<slot :activeTab="activeTab" :registerTabSection="registerTabSection"/>
</template>


<style scoped>
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

.tabs {
	@apply flex w-full justify-between flex-nowrap;
}
</style>
