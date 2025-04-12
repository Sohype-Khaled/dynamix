<script setup lang="ts">
import DXInputDocs from "@/app/modules/inputs/DXInputDocs.vue";
import DXTextareaDocs from "@/app/modules/inputs/DXTextareaDocs.vue";
import DXCheckboxDocs from "@/app/modules/inputs/DXCheckboxDocs.vue";
import DXToggleDocs from "@/app/modules/inputs/DXToggleDocs.vue";
import DXRadioDocs from "@/app/modules/inputs/DXRadioDocs.vue";
import DXDatePickerDocs from "@/app/modules/inputs/DXDatePickerDocs.vue";

import DXFileInputDocs from "@/app/modules/inputs/DXFileInputDocs.vue";
import DXTipTapDocs from "@/app/modules/inputs/DXTipTapDocs.vue";
</script>

<template>
	<div class="max-w-5xl mx-auto px-4 ">
		<h1 class="text-3xl font-bold mb-2">Inputs</h1>
		<hr class="mb-8 mt-12">
		<DXTipTapDocs/>


		<hr class="mb-8 mt-12">
		<DXInputDocs/>

		<hr class="mb-8 mt-12">
		<DXTextareaDocs/>

		<hr class="mb-8 mt-12">
		<DXDatePickerDocs/>


		<hr class="mb-8 mt-12">
		<DXFileInputDocs/>

		<hr class="mb-8 mt-12">
		<DXCheckboxDocs/>

		<hr class="mb-8 mt-12">
		<DXToggleDocs/>

		<hr class="mb-8 mt-12">
		<DXRadioDocs/>

	</div>
</template>

