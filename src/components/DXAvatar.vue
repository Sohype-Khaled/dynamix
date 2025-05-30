<script setup lang="ts">
import { computed } from 'vue'

// Types

type AvatarLike = {
	src?: string
	alt?: string
	[key: string]: any
}

const avatarSizeClasses = {
	xs: 'w-6 h-6',
	sm: 'w-8 h-8',
	md: 'w-10 h-10',
	lg: 'w-20 h-20',
	xl: 'w-36 h-36',
} as const

// Types

type AvatarSizeClass = keyof typeof avatarSizeClasses

type IndicatorPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// Props
const props = withDefaults(defineProps<{
	items: AvatarLike[]
	size?: AvatarSizeClass
	customSizeClass?: string
	maxVisible?: number
	gridCols?: number
	grid?: boolean
	overlap?: boolean
	showOverflow?: boolean
	circle?: boolean
	squareContainer?: boolean
	borderColor?: string
	backgroundColor?: string
	textColor?: string
	indicator?: boolean
	indicatorColor?: string
	indicatorBorderColor?: string
	indicatorPosition?: IndicatorPosition
	placeholderImage?: string
}>(), {
	size: 'md',
	maxVisible: 4,
	gridCols: 2,
	grid: false,
	overlap: false,
	showOverflow: true,
	circle: false,
	squareContainer: false,
	borderColor: 'white',
	indicator: false,
	indicatorColor: 'primary',
	indicatorBorderColor: 'white',
	indicatorPosition: 'bottom-right',
	backgroundColor: 'bg-gray-200',
	textColor: 'text-gray-700'
})

// Computed
const hasOverflow = computed(() => props.items.length > props.maxVisible)
const visibleItems = computed(() => {
	if (!props.showOverflow || !hasOverflow.value) return props.items.slice(0, props.maxVisible)
	return props.items.slice(0, props.maxVisible - 1)
})
const overflowCount = computed(() => hasOverflow.value ? props.items.length - visibleItems.value.length : 0)
const isSingle = computed(() => visibleItems.value.length === 1)
const shapeClass = computed(() => props.circle ? 'rounded-full' : 'rounded-sm')
const sizeClass = computed(() => props.customSizeClass?.trim() || avatarSizeClasses[props.size])
const containerSizeClass = computed(() => props.squareContainer || isSingle.value ? sizeClass.value : '')
const overlapMargin = computed(() => {
	switch (props.size) {
		case 'xs': return '-ml-1 -mt-1'
		case 'sm': return '-ml-1.5 -mt-1.5'
		case 'md': return '-ml-2 -mt-2'
		case 'lg': return '-ml-3 -mt-3'
		case 'xl': return '-ml-4 -mt-4'
		default: return '-ml-2 -mt-2'
	}
})
const layoutClass = computed(() => {
	if (isSingle.value) return 'flex items-center justify-center'
	if (props.grid) return `grid grid-cols-${props.gridCols} gap-0.5`
	if (props.overlap) return 'flex flex-wrap content-start items-start'
	return ''
})
const overlapEnabled = computed(() => props.overlap && !isSingle.value)

const indicatorClass = computed(() => {
	if (!props.indicatorPosition) return ''

	const base = 'absolute rounded-full pointer-events-none'
	const sizeClass = {
		xs: 'w-[20%] h-[20%]',
		sm: 'w-[20%] h-[20%]',
		md: 'w-[20%] h-[20%]',
		lg: 'w-[20%] h-[20%]',
		xl: 'w-[20%] h-[20%]'
	}[props.size || 'md']

	const style = `
    background-color: var(--color-${props.indicatorColor});
  `

	let posClass = ''
	switch (props.indicatorPosition) {
		case 'top-left':
			posClass = props.circle ? 'top-[6%] left-[6%]' : 'top-0 left-0'
			break
		case 'top-right':
			posClass = props.circle ? 'top-[6%] right-[6%]' : 'top-0 right-0'
			break
		case 'bottom-left':
			posClass = props.circle ? 'bottom-[6%] left-[6%]' : 'bottom-0 left-0'
			break
		case 'bottom-right':
			posClass = props.circle ? 'bottom-[6%] right-[6%]' : 'bottom-0 right-0'
			break
	}

	return [`${base} ${sizeClass} ${posClass}`, style]
})
</script>

<template>
	<div
		:class="[
      'relative',
      squareContainer ? 'aspect-square' : '',
      containerSizeClass,
      layoutClass
    ]"
	>
		<template v-for="(item, idx) in visibleItems" :key="item.src || idx">
			<div
				class="overflow-visible border aspect-square shrink-0 relative"
				:class="[
          shapeClass,
          `border-${props.borderColor}`,
          isSingle ? 'w-full h-full' : (squareContainer ? 'flex-1' : sizeClass),
          overlapEnabled ? overlapMargin : ''
        ]"
				:title="item.alt"
			>
				<img
					v-if="item.src || props.placeholderImage"
					class="w-full h-full object-cover"
					:class="shapeClass"
					:src="item.src || props.placeholderImage"
					:alt="item.alt || 'Avatar'"
				/>
				<div
					v-else
					class="w-full h-full flex items-center justify-center text-sm font-semibold uppercase"
					:class="[props.backgroundColor, props.textColor, shapeClass]"
				>
					{{ item.alt?.charAt(0) || '?' }}
				</div>
				<span
					v-if="indicator && idx === 0"
					:class="indicatorClass[0]"
					:style="indicatorClass[1]"
				/>
			</div>
		</template>

		<div
			v-if="!isSingle && showOverflow && overflowCount > 0"
			class="overflow-visible border aspect-square shrink-0 relative"
			:class="[
        shapeClass,
        `border-${props.borderColor}`,
        squareContainer ? 'flex-1' : sizeClass,
        props.backgroundColor,
        props.textColor,
        overlapEnabled ? overlapMargin : ''
      ]"
		>
			<div class="w-full h-full flex items-center justify-center text-sm font-semibold">
				+{{ overflowCount }}
			</div>
		</div>
	</div>
</template>
