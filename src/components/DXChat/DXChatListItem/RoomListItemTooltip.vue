<script setup lang="ts">
import PeersAvatar from "@/components/RoomListItem/PeersAvatar.vue";

defineProps<{
	users: Array<{
		src: string;
		alt: string;
	}>;
	title: string;
	subtitle: string;
}>();
</script>

<template>
	<div class="mx-4 my-1 p-4 rounded-xl bg-white shadow-xl min-w-72 max-w-sm border-1 border-gray-50">
		<div class="flex items-start justify-start gap-2 p-2 border-b-1 border-gray-100 mb-3">
			<div class="flex flex-col items-center w-13 gap-2 " v-for="user in users" :key="user.src">
				<PeersAvatar :peers="[user]"/>
				<p class="text-gray-700 text-xs font-semibold text-center leading-3">{{ user.alt }}</p>
			</div>
		</div>
		<h4
			class="font-semibold text-sm capitalize text-primary leading-[0.9] whitespace-wrap w-full mb-1"
			v-text="title"/>
		<p class="text-gray-700 text-xs font-semibold leading-3" v-text="subtitle"/>
	</div>
</template>
