<script setup lang="ts">
import {DXDialogBody, DXDialogFooter} from "@/components";
import {DXButton} from "@/components/DXButton";

const emit = defineEmits(['close']);
defineProps(['title', 'description']);
</script>

<template>
	<DXDialogBody>
		<h1 v-text="title"/>
		<p v-text="description"/>
	</DXDialogBody>
	<DXDialogFooter>
		<DXButton label="Close" severity="secondary" @click="emit('close')"/>
	</DXDialogFooter>
</template>
