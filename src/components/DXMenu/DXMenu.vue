<script setup lang="ts">
import {onMounted, reactive, watch} from 'vue'
import type {DXMenuItemProps} from "@/types/menu";
import DXMenuItem from "@/components/DXMenu/DXMenuItem.vue";

const props = defineProps<{
	items: DXMenuItemProps[]
}>()

const expandState = reactive<Record<string, boolean>>({})

onMounted(() => {
	initExpandState(props.items)
})

watch(
	() => props.items,
	(items) => {
		initExpandState(items)
	},
	{immediate: true, deep: true}
)

function initExpandState(items: DXMenuItemProps[]) {
	for (const item of items) {
		if (item.collapsible && item.key) {
			if (!(item.key in expandState)) {
				expandState[item.key] = !!item.expanded
			}
		}
		if (item.items?.length) {
			initExpandState(item.items)
		}
	}
}

function toggleKey(key: string, value?: boolean) {
	if (key in expandState) {
		expandState[key] = value ?? !expandState[key]
	} else {
		expandState[key] = value ?? true
	}
}

function resolvedLabel(item: DXMenuItemProps): string {
	return typeof item.label === 'function' ? item.label() : item.label ?? ''
}

interface SlotScope {
	item: DXMenuItemProps
	label?: string
	props: Record<string, unknown>
	expanded?: boolean
	runCommand?: (value?: boolean) => void
}
</script>

<template>
	<div class="w-full flex flex-col gap-2 p-2">
		<!-- Start Slot -->
		<slot name="start"/>

		<!-- Menu Items -->
		<div v-for="item in items" :key="item.key">
			<!-- Separator -->
			<template v-if="item.separator">
				<DXMenuItem :item="item"/>
			</template>

			<!-- Submenu -->
			<template v-else-if="item.items?.length">
				<slot
					name="submenuitem"
					:item="item"
					:expanded="expandState[item.key!]"
					:runCommand="(val?: boolean) => toggleKey(item.key!, val)"
				>
					<DXMenuItem
						:item="item"
						:expanded="expandState[item.key!]"
						@update:expanded="(val: boolean) => toggleKey(item.key!, val)"
					/>

					<Transition
						enter-active-class="transition-all duration-300 ease-in-out"
						leave-active-class="transition-all duration-200 ease-in-out"
						enter-from-class="opacity-0 max-h-0"
						enter-to-class="opacity-100 max-h-96"
						leave-from-class="opacity-100 max-h-96"
						leave-to-class="opacity-0 max-h-0"
					>
						<div
							v-show="expandState[item.key!]"
							class="pl-2 overflow-hidden"
						>
							<DXMenu :items="item.items">
								<template #item="subScope: SlotScope">
									<slot name="item" v-bind="subScope"/>
								</template>
								<template #submenuitem="subScope: SlotScope">
									<slot name="submenuitem" v-bind="subScope"/>
								</template>
							</DXMenu>
						</div>
					</Transition>
				</slot>
			</template>

			<!-- Regular Item -->
			<template v-else>
				<slot
					name="item"
					:item="item"
					:label="resolvedLabel(item)"
					:props="{}"
					:expanded="expandState[item.key!]"
					:runCommand="(val?: boolean) => toggleKey(item.key!, val)"
				>
					<DXMenuItem :item="item"/>
				</slot>
			</template>
		</div>

		<!-- End Slot -->
		<slot name="end"/>
	</div>
</template>
