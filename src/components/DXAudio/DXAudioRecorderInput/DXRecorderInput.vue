<script setup lang="ts">
import {nextTick, ref, watch} from 'vue';
import {useAudioRecorder} from '@/composables/audio/useAudioRecorder.ts';
import DXRecordPlayback from "@/components/DXAudio/DXAudioRecorderInput/DXRecordPlayback.vue";
import {Icon} from "@iconify/vue";
import {vRipple} from '@/directives/ripple';
import DXMicWaveformCanvas from "@/components/DXAudio/DXMicWaveformCanvas.vue";


// Props & Emits
const props = withDefaults(defineProps<{
	audioBitsPerSecond?: number
	noiseSuppression?: boolean
	autoGainControl?: boolean
	echoCancellation?: boolean
	sampleRate?: number
	channelCount?: number
}>(), {
	audioBitsPerSecond: 192000,
	noiseSuppression: true,
	autoGainControl: true,
	echoCancellation: true,
	sampleRate: 44100,
	channelCount: 2
});

const model = defineModel<Blob | null>()

const emit = defineEmits<{
	(e: 'reset'): void;
}>();

// Recorder composable
const {
	mediaStream,
	formattedTime,
	audioUrl,
	audioBlob,
	isRecording,
	isPaused,
	error,
	fastStart,
	stop,
} = useAudioRecorder({
	audioBitsPerSecond: props.audioBitsPerSecond, // This can be kept or removed for testing different aspects
	audioTrackConstraints: {
	  noiseSuppression: props.noiseSuppression,    // To re-enable noise suppression
	  autoGainControl: props.autoGainControl,     // To re-enable automatic gain control
	  echoCancellation: props.echoCancellation,    // To re-enable echo cancellation
	  sampleRate: props.sampleRate,      // To request a specific sample rate
	  channelCount: props.channelCount          // To request mono audio
	}
});
const showPlayback = ref(false);


// Toggle between recording and stopping
const toggle = async () => {
	if (isRecording.value) {
		stop();
		await nextTick();
		showPlayback.value = true;
	} else {
		showPlayback.value = false;
		await nextTick();
		await fastStart();
	}
};

const startRecording = async () => {
	showPlayback.value = false;
	await nextTick();
	await fastStart();
};

const resetRecorder = async () => {
	stop();
	await nextTick();

	model.value = null;
	emit('reset');
};

watch(audioBlob, (blob) => {
	if (blob) {
		model.value = blob;
	}
});

defineExpose({
	error,
	isRecording,
	toggle,
	stop,
	startRecording,
	resetRecorder,
});
</script>

<template>
	<div class="flex items-center w-full gap-[2px]">
		<!-- Reset Button -->
		<button
			type="button"
			v-ripple
			class="inline-flex items-center justify-center w-[28px] h-[28px] p-0 rounded-full overflow-hidden cursor-pointer hover:bg-gray-200 text-gray-500 text-[18px]"
			@click="resetRecorder"
		>
			<Icon icon="mdi:trash-can-outline" class="w-5 h-5"/>
		</button>

		<!-- Recorder or Playback Container -->
		<div class="flex items-center gap-[4px] flex-1 h-[36px] border border-gray-200 rounded-full overflow-hidden">
			<template v-if="isRecording">
				<span
					v-if="!isPaused"
					class="w-[10px] h-[10px] rounded-full bg-[red] shadow-lg shadow-[#0000001A] ms-[8px]"
				/>
				<span class="text-[10px] font-semibold text-gray-500 w-[34px]" v-text="formattedTime"/>
				<DXMicWaveformCanvas
					:stream="mediaStream"
				/>
			</template>
			<span class="text-[10px] leading-[1] text-danger font-semibold w-full mx-[8px]"
			      v-if="error"
			      v-text="error"/>
			<!-- Playback Transition -->
			<Transition name="fade">
				<DXRecordPlayback
					v-if="showPlayback && audioUrl"
					:audio-url="audioUrl"
					:key="audioUrl"
				/>
			</Transition>
		</div>


		<!-- Record/Play Toggle Button -->
		<button
			type="button"
			v-ripple
			class="inline-flex items-center justify-center w-[28px] h-[28px] p-0 rounded-full overflow-hidden cursor-pointer hover:bg-gray-200 text-gray-500"
			@click="toggle"
		>
			<Transition name="fade" mode="out-in">
				<Icon
					:key="isRecording ? 'pause' : 'mic'"
					:icon="isRecording ? 'mdi:pause' : 'mdi:microphone-outline'"
					class="w-6 h-6"
				/>
			</Transition>
		</button>
	</div>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
