<script setup lang="ts">
import {computed, ref, useAttrs} from 'vue';
import DXInputWrapper from './DXInputWrapper.vue'; // ✅ use the fixed-label wrapper

defineOptions({ inheritAttrs: false });

interface Props {
	label: string;
	state?: 'default' | 'success' | 'error';
	message?: string;
	modelValue?: string; // comma-separated string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
});

const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();

const inputValue = ref('');

// Convert string to array
const tags = computed(() =>
	props.modelValue
		.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag.length > 0)
);

function addTagFromInput() {
	const input = inputValue.value.trim();
	if (!input) return;

	const newTags = input
		.split(',')
		.map(t => t.trim())
		.filter(t => t.length && !tags.value.includes(t));

	if (newTags.length) {
		const combined = [...tags.value, ...newTags].join(',');
		emit('update:modelValue', combined);
	}
	inputValue.value = '';
}

function removeTag(index: number) {
	const updated = [...tags.value];
	updated.splice(index, 1);
	emit('update:modelValue', updated.join(','));
}

function handleKeyDown(e: KeyboardEvent) {
	if (e.key === 'Tab' || e.key === ',') {
		e.preventDefault();
		addTagFromInput();
	}
}
</script>

<template>
	<DXInputWrapper
		:label="label"
		:state="state"
		:message="message"
		:modelValue="inputValue"
		@update:modelValue="val => inputValue = val"
	>
		<template #control="{ id, class: inputClass, value, onInput }">
			<div
				:id="id"
				:class="[inputClass, 'flex flex-wrap gap-1 items-center px-2 py-2 min-h-[2.75rem]']"
			>
				<!-- Pills -->
				<span
					v-for="(tag, index) in tags"
					:key="tag + index"
					class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"
				>
					{{ tag }}
					<button
						type="button"
						@click="removeTag(index)"
						class="text-blue-700 hover:text-red-500 font-bold cursor-pointer"
					>
						×
					</button>
				</span>

				<!-- Input -->
				<input
					v-bind="attrs"
					:value="value"
					@input="onInput"
					@keydown="handleKeyDown"
					@blur="addTagFromInput"
					placeholder=" "
					class="bg-transparent outline-none border-none flex-1 text-sm min-w-[4rem]"
				/>
			</div>
		</template>
	</DXInputWrapper>
</template>
