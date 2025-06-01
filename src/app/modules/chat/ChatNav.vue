<script setup lang="ts">
import DXTabs from "@/components/DXTabs/DXTabs.vue";
import DXTab from "@/components/DXTabs/DXTab.vue";
import {Icon} from "@iconify/vue";
import {ref} from "vue";

const view = ref("home")

const routes = ref([
	{
		title: "Home",
		key: "home",
		icon: "nawah:home",
		route: {
			name: 'home'
		},
	},
	{
		title: 'Customer Support',
		key: 'customerSupport',
		icon: "nawah:customer-support",
		route: {
			name: 'rooms',
			params: {
				roomType: 'customerSupport'
			}
		},
	},
])
</script>

<template>
	<DXTabs v-model="view" no-style class="flex gap-2 items-center justify-center">
		<template #tabs="{ activeTab, setActiveTab }">
			<DXTab
				v-for="route in routes"
				:key="route.key"
				:name="route.key"
				:label="route.title"
				:activeTab="activeTab"
				:setActiveTab="setActiveTab"
			>
				<template #default="{ isActive, setActiveTab }">
					<button
						role="tab"
						tabindex="-1"
						class="group h-[88px] w-[112px] flex flex-col justify-center items-center p-[12px] cursor-pointer rounded-2xl hover:shadow-md transition-colors duration-150"
						:class="isActive ? 'ring-2 ring-primary' : ''"
						@click="setActiveTab"
					>
						<Icon
							:icon="route.icon"
							:class="isActive ? 'text-primary' : 'text-gray-600 group-hover:text-gray-700'"
							class="mb-[8px] w-[24px] h-[24px] transition-colors duration-150"
						/>
						<span
							class="text-[12px] font-bold leading-[16px] text-center transition-colors duration-150"
							:class="isActive ? 'text-primary' : 'text-gray-600 group-hover:text-gray-700'"
							v-text="route.title"
						/>
					</button>
				</template>
			</DXTab>
		</template>
	</DXTabs>
</template>
