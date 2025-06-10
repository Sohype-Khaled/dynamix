<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useWaveformRenderer, type WaveformRenderOptions } from '@/composables/audio/useWaveformRenderer.ts';

const props = defineProps<{
	audioSrc: string;
	context: AudioContext;
	options?: WaveformRenderOptions;
	progress: number;
}>();

const emit = defineEmits<{
	(e: 'seek', progress: number): void;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

const {
	extractWaveformFromAudio,
	updateWaveform,
	hoverX,
	isHovering
} = useWaveformRenderer(props.options ?? {});

const resizeCanvas = () => {
	if (!canvas.value) return;

	const dpr = window.devicePixelRatio || 1;
	const width = canvas.value.offsetWidth;
	const height = canvas.value.offsetHeight;


	canvas.value.width = width * dpr;
	canvas.value.height = height * dpr;

	const ctx = canvas.value.getContext('2d');
	if (ctx) ctx.scale(dpr, dpr);

	if (isReady.value) {
		updateWaveform(canvas.value);
		updateWaveform(canvas.value, props.progress);
	}
};

const handleMouseMove = (e: MouseEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	hoverX.value = e.clientX - rect.left;
	isHovering.value = true;
};

const handleMouseLeave = () => {
	isHovering.value = false;
};

const handleClick = (e: MouseEvent) => {
	if (!canvas.value) return;
	const rect = canvas.value.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const progress = x / rect.width;
	emit('seek', progress);
};

watch(() => props.progress, (val) => {
	if (isReady.value && canvas.value) {
		updateWaveform(canvas.value, val);
	}
});

onMounted(async () => {
	await nextTick();
	if (!canvas.value || !props.context || !props.audioSrc) return;

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	canvas.value.addEventListener('mousemove', handleMouseMove);
	canvas.value.addEventListener('mouseleave', handleMouseLeave);
	canvas.value.addEventListener('click', handleClick);

	try {
		await extractWaveformFromAudio(props.audioSrc, canvas.value, props.context);
		isReady.value = true;
		updateWaveform(canvas.value);
	} catch (e) {
		console.error('Failed to extract waveform:', e);
	}
});

onUnmounted(() => {
	window.removeEventListener('resize', resizeCanvas);
	if (canvas.value) {
		canvas.value.removeEventListener('mousemove', handleMouseMove);
		canvas.value.removeEventListener('mouseleave', handleMouseLeave);
		canvas.value.removeEventListener('click', handleClick);
	}
});
</script>

<template>
	<canvas ref="canvas" class="w-full h-full rounded cursor-pointer" />
</template>
