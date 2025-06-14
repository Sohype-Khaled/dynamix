<script setup lang="ts">
import {Icon} from "@iconify/vue"

import {computed} from "vue";
import type {DXMenuItemProps} from "@/types/menu";


const props = defineProps<{
	item: DXMenuItemProps
	expanded?: boolean
}>()

const emit = defineEmits<{
	(e: 'update:expanded', value: boolean): void
}>()

const resolvedLabel = computed(() => {
	const val = props.item.label
	return typeof val === 'function' ? val() : val ?? ''
})

const isVisible = computed(() => {
	if (props.item.visible === undefined) return true
	return typeof props.item.visible === 'function' ? props.item.visible() : props.item.visible
})

const isDisabled = computed(() => {
	if (props.item.disabled === undefined) return false
	return typeof props.item.disabled === 'function' ? props.item.disabled() : props.item.disabled
})


const handleClick = (e: Event) => {
	if (isDisabled.value) {
		e.preventDefault()
		e.stopPropagation()
		return
	}

	if (props.item.collapsible) {
		e.preventDefault()
		emit('update:expanded', !props.expanded)
		return
	}

	runCommand(e)
}

const runCommand = (event?: Event) => {
	if (!isDisabled.value && typeof props.item.command === 'function') {
		props.item.command({originalEvent: event ?? new Event('click'), item: props.item})
	}
}


const chevronDirection = computed(() =>
	props.expanded ? 'up' : 'down'
)
</script>

<template>
	<!-- Visible Item -->
	<component
		v-if="isVisible && !item.separator"
		:is="item.url ? 'a' : 'div'"
		:href="item.url"
		:target="item.target"
		:class="[
      'flex items-center gap-4 px-4 py-3 transition rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-300',
      item.class,
      { 'pointer-events-none opacity-50': isDisabled },
    ]"
		:style="item.style"
		@click="handleClick"
	>
		<!-- Icon or slot -->
		<div
			v-if="item.icon || $slots.icon"
			class="flex-shrink-0  rounded-full overflow-hidden  flex items-center justify-center "
		>
			<slot name="icon">
				<Icon
					v-if="item.icon"
					:icon="item.icon"
					class="text-primary-600"/>
			</slot>
		</div>

		<!-- Text -->
		<div class="min-w-0">
			<p class="text-sm font-medium text-neutral dark:text-gray-100 truncate">
				<slot name="label">{{ resolvedLabel }}</slot>
			</p>
			<slot name="subtitle"/>
			<slot name="content"/>
		</div>
		<div class="flex items-center gap-1 ms-auto">
			<slot name="right"/>
			<Icon
				v-if="props.item.collapsible"
				:icon="chevronDirection === 'up' ? 'mdi:chevron-up' : 'mdi:chevron-down'"
				class="text-gray-400 shrink-0"
			/>
		</div>

		<!-- Scoped default slot for advanced control -->
		<slot
			:item="item"
			:label="resolvedLabel"
			:runCommand="runCommand"
			:expanded="props.expanded"
			:isDisabled="isDisabled"
		/>
	</component>

	<!-- Separator -->
	<div v-else-if="item.separator" class="my-2 border-t border-gray-200 dark:border-gray-700"/>
</template>
