<script setup lang="ts">
import {computed, provide, ref} from 'vue'
import type {ScrollSize} from "@/types/scroll";


const props = withDefaults(defineProps<{
	modelValue?: string;
	scrollable?: boolean;
	scrollSize?: ScrollSize;
	singlePanel?: boolean;
}>(), {
	scrollable: false,
	scrollSize: 'medium',
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()


const tabsClasses = computed(() => [
	'tabs',
	props.scrollable ? 'scroll' : '',
	props.scrollable ? 'scrollable' : '',
	props.scrollSize ? `scroll-${props.scrollSize}` : '',
])
const activeTab = ref(props.modelValue ?? '')
const sectionRefs = ref<Record<string, HTMLElement | null>>({})

const setActiveTab = (name: string) => {
	activeTab.value = name
	emit('update:modelValue', name)

	if (props.singlePanel && sectionRefs.value[name]) {
		sectionRefs.value[name]!.scrollIntoView({behavior: 'smooth'})
	}
}

provide('activeTab', activeTab)
provide('setActiveTab', setActiveTab)
provide('registerTabSection', (name: string, el: HTMLElement) => {
	sectionRefs.value[name] = el
})
</script>

<template>
	<div class="w-full">
		<div :class="tabsClasses">
			<slot name="tabs"/>
		</div>
		<div class="pt-4">
			<slot/>
		</div>
	</div>
</template>


<style scoped>
@import "tailwindcss";

.tabs {
	@apply flex flex-wrap;
}

.scroll {
	@apply overflow-x-auto flex-nowrap;
}

</style>
