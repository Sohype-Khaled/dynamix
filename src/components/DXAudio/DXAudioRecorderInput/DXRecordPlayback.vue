<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {vRipple} from '@/directives/ripple';
import {useAudioPlayer} from "@/composables/audio/useAudioPlayer.ts";
import {computed, nextTick, onMounted} from "vue";
import type {WaveformRenderOptions} from "@/composables/audio/useWaveformRenderer.ts";
import DXWaveformCanvas from "@/components/DXAudio/DXWaveformCanvas.vue";

const props = defineProps<{
	audioUrl: string;
}>();

const {
	audioEl,
	isPlaying,
	currentTimeFormatted,
	durationFormatted,
	currentTime,
	hasLoaded,
	audioContext,
	progress,
	seek,
	setup,
	play,
	pause,
} = useAudioPlayer(props.audioUrl);

const options = computed((): WaveformRenderOptions => ({
		alignment: 'center',
		barWidth: 3,
		progressColor: '#10b981',
		hoverColor: 'transparent',
		inactiveColor: '#d1d5db',
		centerLineColor: 'rgba(0, 0, 0, 0.1)',
		hoverProgressColor: '#0f766e',
		hoverInactiveColor: '#9ca3af',
	} as WaveformRenderOptions
))


onMounted(async () => {
	await nextTick(); // ensures audioEl is bound
	if (audioEl.value) {
		void setup(audioEl.value);
	}
});
</script>

<template>
	<div class="flex items-center gap-[4px] flex-1 h-[36px] w-full">
		<audio ref="audioEl" :src="audioUrl"/>
		<button
			type="button"
			v-ripple
			class="flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-gray-200"
			@click="isPlaying ? pause() : play()"
		>
			<Icon :icon="isPlaying ? 'mdi:pause' : 'mdi:play'" class="w-5 h-5 text-gray-600"/>
		</button>

		<!-- Time display -->
		<span
			class="text-[10px] font-semibold text-gray-500 w-[34px]"
			v-text="currentTime > 0 ? currentTimeFormatted : durationFormatted"
		/>
		<div class="flex-1 h-full me-[8px]">
			<DXWaveformCanvas
				v-if="audioContext && hasLoaded"
				:audio-src="audioUrl"
				:context="audioContext"
				:progress="progress"
				:options="options"
				@seek="seek"
			/>
		</div>
	</div>
</template>

