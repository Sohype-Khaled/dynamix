<script setup lang="ts">
import {items as data} from "./data.ts";
import {ref} from "vue";
import {useLightbox} from "@/composables/useLightbox.ts";

const items = ref(data);
const lightbox = useLightbox(data);


</script>

<template>
	<div class="flex flex-wrap gap-2">
		<img
			v-for="(item, index) in items"
			:key="item.url"
			:src="item.thumbnail"
			:alt="item.caption"
			class="w-20 h-20 object-cover rounded-xl cursor-pointer"
			@click="lightbox.show(index)"
		>
	</div>
</template>


