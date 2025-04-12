<script setup lang="ts">
import {ref} from 'vue';

import PreviewBlock from "@/app/components/PreviewBlock.vue";
import DXInput from "@/components/inputs/DXInput.vue";
import DXTextarea from "@/components/inputs/DXTextarea.vue";
import DXAlert from "@/components/DXAlert.vue";

const label = ref('Heads up!');
const message = ref('This is an alerts preview.');
const html = ref('');
const severity = ref('info' as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark');
const icon = ref('heroicons:information-circle');
const bordered = ref(true);
const accent = ref(false);
const dismissible = ref(true);
const useHtml = ref(false);
</script>

<template>
	<PreviewBlock title="Alert">
		<DXAlert
			class="w-full"
			:label="label"
			:severity="severity"
			:icon="icon"
			:dismissible="dismissible"
			:bordered="bordered"
			:accent="accent"
			:html="useHtml ? html : undefined"
			:message="useHtml ? undefined : message"
		/>
		<template #controls>
			<div>
				<label class="block font-medium mb-1">Severity</label>
				<select v-model="severity" class="w-full border rounded p-2">
					<option value="primary">Primary</option>
					<option value="secondary">Secondary</option>
					<option value="success">Success</option>
					<option value="danger">Danger</option>
					<option value="warning">Warning</option>
					<option value="info">Info</option>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</div>

			<div class="flex gap-2">

				<label class="flex items-center gap-2">
					<DXCheckbox v-model="bordered"/>
					Bordered
				</label>
				<label class="flex items-center gap-2">
					<DXCheckbox v-model="accent"/>
					Accent Top Border
				</label>
				<label class="flex items-center gap-2">
					<DXCheckbox v-model="dismissible"/>
					Dismissible
				</label>
				<label class="flex items-center gap-2">
					<DXCheckbox v-model="useHtml"/>
					Use HTML
				</label>
			</div>

			<DXInput label="Label" v-model="label"/>
			<DXInput label="Icon (Iconify name)" v-model="icon"/>
			<DXTextarea label="HTML Content" v-model="html" v-if="useHtml"/>
			<DXTextarea v-model="message" label="Message" v-else/>
		</template>
	</PreviewBlock>
</template>
