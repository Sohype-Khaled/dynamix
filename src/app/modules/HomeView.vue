<script setup lang="ts">
import {menu} from "@/app/routes/menu.ts";
</script>

<template>
	<div>
		<h1 class="text-3xl font-bold mb-6">Welcome</h1>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="item in menu"
				:key="item.label"
				class="p-6 bg-white dark:text-white dark:bg-gray-800 shadow rounded-lg border border-gray-200"
			>
				<RouterLink
					v-if="!item.children"
					:to="item.to"
					class="text-xl font-semibold dark:text-white text-gray-800 hover:underline"
				>
					{{ item.label }}
				</RouterLink>

				<div v-else>
					<p class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
						{{ item.label }}
					</p>
					<ul class="space-y-1">
						<li v-for="child in item?.children" :key="child.to">
							<RouterLink
								:to="child.to"
								class="text-sm text-blue-600 hover:underline"
							>
								{{ child.label }}
							</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
