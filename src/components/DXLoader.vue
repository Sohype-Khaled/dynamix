<script setup lang="ts">
defineProps<{ visible: boolean; }>();
</script>

<template>
	<Teleport to="body">
		<transition
			enter-active-class="transition-opacity duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-opacity duration-300"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="visible"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			>
				<div
					class="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
					<svg class="w-5 h-5 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
						/>
					</svg>
					<span><slot>Loading...</slot></span>
				</div>
			</div>
		</transition>
	</Teleport>
</template>
