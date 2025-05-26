<script setup lang="ts">
import {inject, onMounted, ref, computed, type Ref} from 'vue'

const props = defineProps<{
	name: string
}>()

const activeTab = inject('activeTab') as Ref<string>
const registerTabSection = inject('registerTabSection', null) as
	| ((name: string, el: HTMLElement) => void)
	| null

const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
	if (registerTabSection && sectionEl.value) {
		registerTabSection(props.name, sectionEl.value)
	}
})

const isActive = computed(() => activeTab.value === props.name)
</script>

<template>
	<div ref="sectionEl" v-show="!registerTabSection || isActive">
		<slot />
	</div>
</template>
