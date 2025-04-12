<script setup lang="ts">
import type {Editor} from '@tiptap/vue-3'
import {Icon} from "@iconify/vue";
import {computed, toRef} from "vue";

import getToolbar from "./toolbar"
const props = defineProps<{ editor: Editor | null }>()




</script>

<template>
	<div class="flex flex-wrap items-center gap-2 p-2 rounded-t-md bg-gray-50 dark:bg-gray-800">
		<div v-for="(group, gIndex) in getToolbar(editor)" :key="gIndex">
			<button
				v-for="(tool, tIndex) in group.actions"
				:key="tIndex"
				@click="tool.action"
				:title="tool.title"
				type="button"
				:class="[
        'p-2 rounded hover:bg-primary-100 dark:hover:bg-primary-800 cursor-pointer',
        tool.isActive() ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
      ]"
			>
				<Icon :icon="tool.icon" class="w-5 h-5" />
			</button>
		</div>

	</div>
</template>

