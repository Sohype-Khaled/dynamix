<script setup lang="ts">
import Sidebar from "@/app/layouts/default/Sidebar.vue";
import DXOverlay from "@/components/overlays/DXOverlay.vue";

</script>

<template>
	<div class="flex">
		<Sidebar />
		<main class="ml-64 p-6 flex-1 min-h-screen ">
			<slot />
		</main>
		<DXOverlay/>
	</div>
</template>