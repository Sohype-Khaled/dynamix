<script setup lang="ts">
import {computed, CSSProperties, ref, useSlots, watch} from 'vue'
import {useElementBounding, useWindowSize} from '@vueuse/core'

const props = defineProps<{
	text?: string
	placement?: 'top' | 'bottom' | 'left' | 'right'
}>()
const slots = useSlots()
const targetRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const windowSize = useWindowSize()
const targetBounds = useElementBounding(targetRef)
const placement = computed(() => props.placement ?? 'top')


const hasContentSlot = computed(() => !!slots.content)
const styles = computed<CSSProperties>(() => {
	if (!tooltipRef.value) {
		return {
			position: 'fixed',
			top: '-9999px',
			left: '-9999px',
			zIndex: '9999'
		}
	}

	const tooltip = tooltipRef.value.getBoundingClientRect()
	const {top, left, width, height} = targetBounds

	let x = 0, y = 0

	switch (placement.value) {
		case 'top':
			x = left.value + width.value / 2 - tooltip.width / 2
			y = top.value - tooltip.height - 8
			break
		case 'bottom':
			x = left.value + width.value / 2 - tooltip.width / 2
			y = top.value + height.value + 8
			break
		case 'left':
			x = left.value - tooltip.width - 8
			y = top.value + height.value / 2 - tooltip.height / 2
			break
		case 'right':
			x = left.value + width.value + 8
			y = top.value + height.value / 2 - tooltip.height / 2
			break
	}

	// Clamp to screen edges
	x = Math.max(8, Math.min(x, windowSize.width.value - tooltip.width - 8))
	y = Math.max(8, Math.min(y, windowSize.height.value - tooltip.height - 8))

	return {
		position: 'fixed',
		top: `${y}px`,
		left: `${x}px`,
		zIndex: '9999'
	}
})

watch([() => windowSize.width.value, () => windowSize.height.value], () => {
	visible.value = false
})
</script>

<template>
  <span
	  ref="targetRef"
	  class="inline-block"
	  @mouseenter="visible = true"
	  @mouseleave="visible = false"
	  @focus="visible = true"
	  @blur="visible = false"
	  tabindex="0"
  >
    <slot/>
    <span
	    v-if="visible"
	    ref="tooltipRef"
	    :style="styles"
	    :class="[
				'pointer-events-none max-w-sm',
		    hasContentSlot ? '' : 'text-sm px-3 py-2 rounded shadow-lg pointer-events-none whitespace-normal bg-black text-white max-w-sm'
		  ]"
    >
      <slot name="content">{{ text }}</slot>
    </span>
  </span>
</template>
