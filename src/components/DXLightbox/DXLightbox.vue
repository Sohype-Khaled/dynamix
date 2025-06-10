<script setup lang="ts">
import type {LightboxItem} from "@/types/lightbox";
import {toRef, watchEffect} from "vue";
import DXButton from "@/components/DXButton.vue";

const props = defineProps<{
	items: LightboxItem[];
	currentIndex: number;
	downloadable: boolean;
}>();

const emit = defineEmits(['close'])
const currentIndex = toRef(props.currentIndex);

const prevItem = () => {
	currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
};

const nextItem = () => {
	currentIndex.value = (currentIndex.value + 1) % props.items.length;
};

watchEffect(() => currentIndex.value = props.currentIndex);
</script>

<template>
	<!-- Top-left: File name & Counter -->
	<div v-if="items.length > 1" class="absolute top-4 left-4 text-white text-md">
		<p v-if="items[currentIndex].filename"
		   class="font-semibold" v-text="items[currentIndex].filename"/>
		<p v-if="items.length > 1"
		   class="font-normal">{{ currentIndex + 1 }} / {{ items.length }}</p>
	</div>

	<!-- Close & Download Buttons (Top-right) -->
	<div class="fixed top-4 right-4 flex space-x-2 bg-gray-100 bg-opacity-5 p-2 rounded-full">
		<DXButton as="a"
		     v-if="downloadable"
		     rounded
		     text
		     severity="white"
		     :href="items[currentIndex].downloadUrl"
		     icon="mdi:download"
		     title="Download" target="_blank"/>

		<!-- Close Button -->
		<DXButton rounded text severity="white" @click="emit('close')" icon="mdi:close" title="Close"/>
	</div>


	<!-- Media Preview -->
	<div class="flex flex-col justify-center items-center w-full h-full">
<!--		<MediaViewer :item="items[currentIndex]"/>-->
	</div>
	<p v-if="items[currentIndex].caption"
	   class="absolute bottom-6 text-center text-gray-300 px-4 text-md"
	   v-text="items[currentIndex].caption"/>

	<!-- Navigation -->
	<div class="absolute left-6 top-1/2 -translate-y-1/2">
		<DXButton
			v-if="items.length > 1"
			@click="prevItem"
			rounded
			size="lg"
			severity="primary-500"
			icon="mdi:chevron-left"
		/>
	</div>

	<div class="absolute right-6 top-1/2 -translate-y-1/2 ">
		<DXButton
			v-if="items.length > 1"
			@click="nextItem"
			rounded
			size="lg"
			severity="primary-500"
			icon="mdi:chevron-right"
		/>
	</div>

</template>


