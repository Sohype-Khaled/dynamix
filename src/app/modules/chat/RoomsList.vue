<script setup lang="ts">
import DXButton from "@/components/DXButton.vue";
import DXChatLayout from "@/components/DXChat/DXChatLayout/DXChatLayout.vue";
import DXChatContainer from "@/components/DXChat/DXChatLayout/DXChatContainer.vue";
</script>

<template>
	<DXChatContainer extraClass="w-96 h-[35rem]">
		<DXChatLayout scrollable auto-scroll-on-mount ref="layoutRef">
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

			<template #footer>
			</template>
		</DXChatLayout>
	</DXChatContainer>
</template>

