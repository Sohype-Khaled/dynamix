<script lang="ts" setup>
import {menu} from "@/app/routes/menu.ts";

import {onMounted, ref, watch} from "vue";

const isDark = ref(localStorage.getItem("theme") === "dark");

// Apply dark mode on mount
onMounted(() => {
	document.documentElement.classList.toggle("dark", isDark.value);
});

// Watch for changes & update `localStorage`
watch(isDark, (newValue) => {
	document.documentElement.classList.toggle("dark", newValue);
	localStorage.setItem("theme", newValue ? "dark" : "light");
});
</script>


<template>
	<aside class="flex flex-col w-64 h-screen bg-gray-800 text-white fixed">
		<nav class="grow flex flex-col p-4 space-y-2">
			<RouterLink
				v-for="link in menu"
				:key="link.to"
				:to="link.to"
				class="p-2 rounded hover:bg-gray-700"
				active-class="bg-gray-700"
			>
				{{ link.label }}
			</RouterLink>
		</nav>
		<div class="flex items-center gap-2 p-4 mt-auto w-full">
			<DXToggle v-model="isDark" id="dark-mode-toggle"/>
			<label for="dark-mode-toggle" class="flex justify-between w-full  text-sm font-medium text-gray-300">
				<span>{{ isDark ? "Light Mode" : "Dark Mode" }}</span>
				<span>{{ isDark ? "☀️" : "🌙" }}</span>
			</label>
		</div>
	</aside>
</template>

