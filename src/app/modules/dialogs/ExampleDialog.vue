<script setup lang="ts">


import DXDialogBody from "@/components/overlays/DXDialog/DXDialogBody.vue";
import DXDialogFooter from "@/components/overlays/DXDialog/DXDialogFooter.vue";
import DXButton from "@/components/DXButton/DXButton.vue";

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
