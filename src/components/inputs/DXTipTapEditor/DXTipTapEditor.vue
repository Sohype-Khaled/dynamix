<script setup lang="ts">
import {useAttrs} from 'vue';
import DXInputWrapper from "../DXInputWrapper.vue";
import DXTipTapTextarea from "@/components/inputs/DXTipTapEditor/DXTipTapTextarea.vue";
import type {JSONContent} from '@tiptap/core'

interface Props {
	label: string
	state?: 'default' | 'success' | 'error'
	message?: string
	modelValue?: JSONContent
}


const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

defineOptions({inheritAttrs: false}); // prevent leaking `attrs` to the outer div
</script>

<template>
	<DXInputWrapper
		class="vue-dynamix"
		:label="label"
		:state="state"
		:message="message"
		:modelValue="modelValue"
		@update:modelValue="emit('update:modelValue', $event)"
	>
		<template #control="{ id, class: inputClass, value, onInput }">
			<DXTipTapTextarea
				:id="id"
				ref="editorRef"
				:modelValue="modelValue"
				:editableClass="inputClass"
				@update:modelValue="emit('update:modelValue', $event)"
			/>
		</template>
	</DXInputWrapper>
</template>

