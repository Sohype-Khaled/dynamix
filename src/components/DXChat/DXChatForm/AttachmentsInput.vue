<!--<script setup lang="ts">-->
<!--import {ref} from "vue";-->
<!--import {DXButton} from "vue-dynamix";-->

<!--const emit = defineEmits(["file:selected",]);-->
<!--const inputRef = ref<HTMLInputElement | null>(null);-->

<!--const handleFileChange = async (event: Event) => {-->
<!--	const input = event.target as HTMLInputElement;-->
<!--	if (!input.files) return;-->
<!--	const files = Array.from(input.files);-->

<!--	// Upload each file in chunks-->
<!--	for (const file of files) {-->
<!--		emit("file:selected", file);-->
<!--	}-->

<!--	// Reset the input value to allow re-selection of the same files-->
<!--	if (inputRef.value) {-->
<!--		inputRef.value.value = "";-->
<!--	}-->
<!--};-->


<!--</script>-->

<!--<template>-->
<!--	<DXButton icon="mdi:paperclip" size="sm" @click="inputRef?.click()"/>-->
<!--	<input-->
<!--		id="file-upload"-->
<!--		ref="inputRef"-->
<!--		type="file"-->
<!--		multiple-->
<!--		class="hidden"-->
<!--		@change="handleFileChange"-->
<!--	/>-->
<!--</template>-->
