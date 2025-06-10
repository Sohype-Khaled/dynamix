<script setup lang="ts">
import DXWaveformCanvas from "@/components/DXAudio/DXWaveformCanvas.vue";
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import type {WaveformRenderOptions} from "@/composables/audio/useWaveformRenderer";
import {useAudioPlayer} from "@/composables/audio/useAudioPlayer";
import {Icon} from "@iconify/vue";

const props = withDefaults(defineProps<{
	src?: string;
	reference?: string;
	isSent: boolean;
	handleGetAudio?: (uuid: string) => Promise<Blob>;
	maxRetries?: number
}>(), {
	handleGetAudio: undefined,
	maxRetries: 3
});

const error = ref<string | null>(null);
const blobUrl = ref<string | null>(null);
let previousBlobUrl: string | null = null;

// Compute final source
const resolvedAudioUrl = computed(() => {
	if (props.src) return props.src;
	if (blobUrl.value) return blobUrl.value;
	return '';
});

// Setup audio player composable
const {
	audioEl,
	audioContext,
	hasLoaded,
	isPlaying,
	progress,
	currentTimeFormatted,
	durationFormatted,
	currentTime,
	seek,
	setup,
	togglePlay,
	setPlaybackRate,
} = useAudioPlayer(resolvedAudioUrl);

const options = computed((): WaveformRenderOptions => ({
	alignment: 'center',
	barWidth: 3,
	maxHeight: 60,
	progressColor: props.isSent ? '#10b981' : '#4a89dc',
	hoverColor: 'transparent',
	inactiveColor: props.isSent ? '#d1d5db' : '#ddd',
	centerLineColor: 'rgba(0, 0, 0, 0.1)',
	hoverProgressColor: props.isSent ? '#0f766e' : '#2d6cc6',
	hoverInactiveColor: props.isSent ? '#9ca3af' : '#c5c5c5',
}));

const speedSteps = [1, 1.5, 2];
const speedIndex = ref(0);
const toggleSpeed = () => {
	speedIndex.value = (speedIndex.value + 1) % speedSteps.length;
	setPlaybackRate(speedSteps[speedIndex.value]);
};


async function fetchWithRetry(uuid: string, attempt = 1): Promise<void> {
	if (!props.handleGetAudio) return;

	try {
		const blob = await props.handleGetAudio(uuid);
		const newUrl = URL.createObjectURL(blob);

		if (previousBlobUrl) URL.revokeObjectURL(previousBlobUrl);

		blobUrl.value = newUrl;
		previousBlobUrl = newUrl;
		error.value = null;
	} catch (e) {
		console.error(`Audio fetch failed (attempt ${attempt}):`, e);
		if (attempt < props.maxRetries) {
			setTimeout(() => fetchWithRetry(uuid, attempt + 1), 500 * attempt); // exponential backoff
		} else {
			error.value = 'Failed to load audio after multiple attempts';
		}
	}
}

// Fetch blob if reference is used
watch(() => props.reference, (newRef) => {
	if (!props.src && newRef) {
		fetchWithRetry(newRef);
	}
}, {immediate: true});

// Setup audio context after source + <audio> is ready
watch(resolvedAudioUrl, async (url) => {
	await nextTick();
	if (url && audioEl.value) {
		await setup(audioEl.value);
	}
});

// If no source at all, set error
onMounted(() => {
	if (!props.src && !props.reference) {
		error.value = 'No audio source available';
	}
});

onUnmounted(() => {
	if (previousBlobUrl) {
		URL.revokeObjectURL(previousBlobUrl);
	}
});

defineExpose({
	currentTimeFormatted,
	durationFormatted,
	currentTime,
});
</script>

<template>
	<div class="flex items-center gap-2 mb-[12px]">
		<!-- Error Message -->
		<div v-if="error" class="text-sm text-red-500 italic">{{ error }}</div>

		<!-- Audio Player UI -->
		<template v-else>
			<audio
				v-if="resolvedAudioUrl"
				ref="audioEl"
				:src="resolvedAudioUrl"
				preload="metadata"
			/>

			<!-- Play / Pause Button -->
			<button
				:class="isSent ? 'text-primary-500' : 'text-gray-500'"
				type="button"
				@click="togglePlay"
			>
				<Icon
					:icon="isPlaying ? 'material-symbols:pause' : 'material-symbols:play-arrow'"
					class="w-6 h-6"
				/>
			</button>

			<!-- Waveform Canvas -->
			<div class="h-[40px] w-full flex-1">
				<DXWaveformCanvas
					v-if="audioContext && hasLoaded && resolvedAudioUrl"
					:audio-src="resolvedAudioUrl"
					:context="audioContext"
					:progress="progress"
					:options="options"
					@seek="seek"
				/>
			</div>

			<!-- Playback Speed Button -->
			<button
				class="text-[10px] w-[36px] font-semibold leading-none rounded-xl px-2 py-1"
				:class="{ 'bg-gray-100': isSent, 'bg-gray-200': !isSent }"
				@click="toggleSpeed"
			>
				{{ speedSteps[speedIndex] }}x
			</button>
		</template>
	</div>
</template>
