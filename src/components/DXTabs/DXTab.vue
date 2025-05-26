<script setup lang="ts">
import {computed, inject, type Ref, useSlots} from 'vue'
import {useDynamixOptions} from "@/globals/plugin-symbol.ts";
import {Icon} from "@iconify/vue";

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type IconPosition = "left" | "right";

const props = withDefaults(defineProps<{
	name: string
	label: string
	size?: Size,
	pill?: boolean
	icon?: string,
	iconPosition?: IconPosition,
	classMap?: string
}>(), {
	size: 'base',
	pill: false,
	iconPosition: 'left',
	classMap: '',
})


const slots = useSlots()
const hasCustomContent = computed(() => !!slots.default)

const options = useDynamixOptions();
const preset = options?.tabPresets?.classMap ?? {};


const activeTab = inject('activeTab') as Ref<string>
const setActiveTab = inject('setActiveTab') as (name: string) => void

const isActive = computed(() => props.name === activeTab.value)

const tabClasses = computed(() => [
	!hasCustomContent.value && 'tab',
	`tab-${props.size}`,
	props.pill ? 'pill' : '',
	props.icon ? 'tab-icon' : '',
	isActive.value ? preset.active : preset.base,
]);

</script>

<template>
		<button
			:class="tabClasses"
			@click="setActiveTab(props.name)"
		>
			<template v-if="hasCustomContent">
				<slot />
			</template>

			<template v-else>
				<!-- Icon (only if not loading) -->
				<Icon v-if="props.icon && props.iconPosition === 'left'" :icon="props.icon" />

				<!-- Label -->
				<span v-if="props.label">{{ props.label }}</span>

				<!-- Icon or spinner on right -->
				<Icon v-if="props.icon && props.iconPosition === 'right'" :icon="props.icon" />
			</template>
		</button>
</template>

<style scoped>
@import "tailwindcss";

.tab {
	@apply inline-flex cursor-pointer items-center justify-center  text-center font-medium transition duration-150 ease-in-out focus:outline-none;
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