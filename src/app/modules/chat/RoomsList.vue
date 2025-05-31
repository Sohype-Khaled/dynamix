<script setup lang="ts">
import DXButton from "@/components/DXButton.vue";
import DXChatLayout from "@/components/DXChat/DXChatLayout/DXChatLayout.vue";
import DXChatContainer from "@/components/DXChat/DXChatLayout/DXChatContainer.vue";

import {generateMockRooms} from "./data.ts";
import {computed, reactive, ref} from "vue";
import DXChatListItem from "@/components/DXChat/DXChatListItem/DXChatListItem.vue";
import DXTabs from "@/components/DXTabs/DXTabs.vue";
import DXTab from "@/components/DXTabs/DXTab.vue";

const layoutRef = ref<InstanceType<typeof DXChatLayout> | null>(null)

const roomsMap = reactive({
	typeA: generateMockRooms(10),
	typeB: generateMockRooms(10),
	typeC: generateMockRooms(10)
})

const selectedType = ref('typeA')
const selectedFilter = ref('all')
const filterOptions = ref([
	{label: 'All', value: 'all'},
	{label: 'Active', value: 'active'},
	{label: 'Archived', value: 'archived'},
])

const rooms = computed(() => roomsMap[selectedType.value as keyof typeof roomsMap])

const getPeersImages = (room: any): { src: string; alt: string }[] =>
	room.peers.map((user: any) => ({
		src: user.image ?? '',
		alt: user.username ?? ''
	}))

const filterChanged = (filter: string) => {
	console.log("Filter changed:", filter)
}

</script>

<template>
	<DXChatContainer extraClass="w-96 h-[35rem]">
		<DXChatLayout scrollable ref="layoutRef">
			<template #header-title>
				<DXButton size="sm" icon="mdi:arrow-left"/>
				<div class="flex flex-col items-start"><h3 class="text-sm font-normal leading-4 text-primary">Customer
					Support</h3><span class="font-semibold text-xs text-gray-700">Hello </span></div>
			</template>
			<template #header-actions>
				<DXButton
					size="sm"
					text
					severity="primary"
					icon="mdi:arrow-collapse"/>
				<DXButton size="sm" icon="mdi:close"/>
			</template>


			<DXTabs v-model="selectedFilter">
				<template #tabs="{ activeTab, setActiveTab }">
					<DXTab
						v-for="option in filterOptions"
						:key="option.value"
						:name="option.value"
						:label="option.label"
						:activeTab="activeTab"
						:setActiveTab="setActiveTab"
						@click="filterChanged(option.value)"
						fill-space/>
				</template>

				<DXChatListItem
					v-for="room in rooms"
					:key="room.uuid"
					:sent-at="room.sentAt"
					:is-closed="room.isClosed"
					:title="room.title"
					:message="room.text || ''"
					:has-attachment="room.hasAttachment"
					:has-audio="room.hasAudio"
					:unseen-count="room.unseenCount"
					:users="room.peerImages || []"
					:peers="room.peers"
					:peer-names="room.peerNames"
					:peer-images="room.peerImages"
					:indicator="room.indicator"
					:indicator-color="room.indicatorColor"
				/>
			</DXTabs>


			<template #footer>
			</template>
		</DXChatLayout>
	</DXChatContainer>
</template>

