<script setup lang="ts">
import {computed, type Slots, useSlots} from 'vue'
import { Icon } from '@iconify/vue'
import { useDynamixOptions } from '@/globals/plugin-symbol.ts'

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type IconPosition = 'left' | 'right'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
	name: string
	label: string
	activeTab: string
	setActiveTab: (name: string) => void
	size?: Size
	pill?: boolean
	icon?: string
	iconPosition?: IconPosition
	classMap?: string
	fillSpace?: boolean
}>(), {
	size: 'base',
	pill: false,
	iconPosition: 'left',
	classMap: '',
})

const emit = defineEmits<{
	(e: 'click', value: string): void
}>()

const options = useDynamixOptions()
const preset = options?.tabPresets?.classMap ?? {}

const slots = useSlots() as Slots
const hasCustomSlot = computed(() => !!slots.default)
const isActive = computed(() => props.name === props.activeTab)

const tabClasses = computed(() => [
	'tab',
	`tab-${props.size}`,
	props.fillSpace ? 'fill-space' : '',
	props.pill ? 'pill' : '',
	props.icon ? 'tab-icon' : '',
	isActive.value ? preset.active : preset.base,
	props.classMap
])

const setActiveTab = () => {
	emit('click', props.name)
	props.setActiveTab(props.name)
}
</script>

<template>
	<slot
		v-if="hasCustomSlot"
		:name="name"
		:isActive="isActive"
		:setActiveTab="setActiveTab"
		:label="label"
		:icon="icon"
		:iconPosition="iconPosition"
	/>
	<button
		v-else
		:class="tabClasses"
		@click="setActiveTab"
		role="tab"
		:aria-selected="isActive"
	>
		<Icon v-if="icon && iconPosition === 'left'" :icon="icon" />
		<span v-if="label">{{ label }}</span>
		<Icon v-if="icon && iconPosition === 'right'" :icon="icon" />
	</button>
</template>

<style scoped>
@import "tailwindcss";

.tab {
	@apply inline-flex cursor-pointer items-center justify-center text-center font-medium transition duration-150 ease-in-out focus:outline-none rounded-t-md;
}

.tab.fill-space {
	@apply w-full;
}
.tab.pill {
	@apply rounded-full;
}

.tab.tab-xs {
	@apply gap-1 px-3 py-2 text-xs;
}

.tab.tab-sm {
	@apply gap-1.5 px-3 py-2 text-sm;
}

.tab.tab-base {
	@apply gap-2 px-5 py-2.5 text-sm;
}

.tab.tab-lg {
	@apply gap-2 px-5 py-3 text-base;
}

.tab.tab-xl {
	@apply gap-2.5 px-6 py-3.5 text-base;
}

.tab.tab-xs.tab-icon {
	@apply p-1.5 ;
}

.tab.tab-sm.tab-icon {
	@apply p-2;
}

.tab.tab-base.tab-icon {
	@apply p-2.5 ;
}

.tab.tab-lg.tab-icon {
	@apply p-3
}

.tab.tab-xl.tab-icon {
	@apply p-3.5  ;
}

.tab.tab-xs.tab-icon svg {
	@apply w-3 h-3;
}

.tab.tab-sm.tab-icon svg {
	@apply w-4 h-4;
}

.tab.tab-base.tab-icon svg,
.tab.tab-lg.tab-icon svg {
	@apply w-5 h-5;
}

.tab.tab-xl.tab-icon svg {
	@apply w-6 h-6;
}

</style>