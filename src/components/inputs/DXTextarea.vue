<script setup lang="ts">
import {useAttrs} from 'vue';
import DXInputWrapper from "@/components/inputs/DXInputWrapper.vue";

interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();

defineOptions({ inheritAttrs: false }); // prevent leaking `attrs` to the outer div
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
			<textarea
				v-bind="attrs"
				:id="id"
				:value="value"
				@input="onInput"
				:class="[inputClass, 'min-h-[6rem] resize-none']"
			/>
		</template>
	</DXInputWrapper>
</template>
