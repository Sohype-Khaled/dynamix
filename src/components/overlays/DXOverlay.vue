<script setup lang="ts">
import {computed, onMounted, onUnmounted} from "vue";
import {useOverlay} from "@/composables/useOverlay.ts";
import DXDialog from "@/components/overlays/DXDialog/DXDialog.vue";


const {isOpen, overlayStack, close} = useOverlay();
const overlayOpacity = computed(() => Math.min(0.5 + overlayStack.value.length * 0.1, 0.9));

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		close();
	}
};

onMounted(() => window.addEventListener("keydown", handleKeydown));

onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

</script>

<template>
	<div v-if="isOpen"
	     class="fixed inset-0 z-[1000000] flex items-center justify-center p-4"
	     :style="{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }">
		>
		<div v-for="(overlay, index) in overlayStack" :key="overlay.id"
		     class="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm"
		     :style="{ zIndex: 1000000 + index }">

			<!-- Dialogs -->
			<DXDialog
				v-if="overlay.type === 'dialog'"
				v-bind="overlay.overlayProps || {}"
				v-on="{ ...overlay.listeners, close: () => close(overlay.id) }"
			>
				<component :is="overlay.component" v-bind="overlay.props" v-on="overlay.listeners"/>
			</DXDialog>

			<!-- Overlays -->
			<component
				v-else
				:is="overlay.component"
				v-bind="overlay.props"
				v-on="{ ...overlay.listeners, close: () => close(overlay.id) }"
			/>
		</div>
	</div>
</template>
