<script setup lang="ts">
import ChatRoom from "@/app/modules/chat/ChatRoom.vue";
import RoomsList from "@/app/modules/chat/RoomsList.vue";
import {ref} from "vue";
import DXAvatar from "@/components/DXAvatar.vue";

const avatars = ref([
	{
		src: "",
		alt: "Avatar"

	},
	{
		src: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80",
		alt: "Avatar"
	},
	{
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80",
		alt: "Avatar"
	},
	{
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80",
		alt: "Avatar"
	},
	{
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80",
		alt: "Avatar"
	},
	{
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80",
		alt: "Avatar"
	}
])

</script>

<template>
	<div class="flex flex-wrap gap-6">
		<ChatRoom/>
		<RoomsList/>
		<div class="flex justify-center items-center p-3 gap-4 bg-gray-100">
			<DXAvatar size="md"
			          overlap
			          placeholder-image="https://admin.nawahscientific.com/static/users/avatar.svg"
			          circle :items="avatars"/>
			<DXAvatar size="md"
			          overlap circle square-container grid :items="avatars"/>
			<DXAvatar size="md"
			          placeholder-image="https://admin.nawahscientific.com/static/users/avatar.svg"
			          :items="[avatars[2]]"/>
			<DXAvatar size="md"
			          indicato
			          circle
			          :items="[avatars[1]]"/>
			<DXAvatar :items="[avatars[0]]"
			          size="md"
			          indicator
			          circle/>
		</div>
	</div>
</template>

