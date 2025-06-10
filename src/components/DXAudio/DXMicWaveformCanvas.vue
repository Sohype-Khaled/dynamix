<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { PropType } from 'vue';

// Define interfaces locally for this component
export interface LiveWaveformOptions {
  barWidth?: number;
  barColor?: string;
  centerLineColor?: string;
  alignment?: 'bottom' | 'center' | 'mirror';
  barGap?: number;
}
export interface DotLineOptions {
  color?: string;
  dotSize?: number;
  spacing?: number;
  scrollSpeed?: number;
}

const props = defineProps({
  stream: { type: Object as PropType<MediaStream | null>, default: null },
  options: { type: Object as PropType<LiveWaveformOptions>, required: false },
  dotLineOptions: { type: Object as PropType<DotLineOptions>, required: false }
});

const canvasEl = ref<HTMLCanvasElement | null>(null);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);
const audioContext = ref<AudioContext | null>(null);
const analyserNode = ref<AnalyserNode | null>(null);
const mediaStreamSource = ref<MediaStreamAudioSourceNode | null>(null);
const animationFrameId = ref<number | null>(null);

const barHeightsData = ref<number[]>([]);
const timeDomainDataArray = ref<Uint8Array | null>(null);
const maxBars = ref<number>(100);
const dotLineOffset = ref<number>(0);

let resizeObserver: ResizeObserver | null = null;

const calculateMaxBars = () => {
  if (canvasEl.value) {
    const logicalWidth = canvasEl.value.offsetWidth;
    const barWidthOption = props.options?.barWidth || 2;
    const barGapOption = props.options?.barGap || 0;
    const barCellWidth = barWidthOption + barGapOption;
    if (barCellWidth > 0) {
      maxBars.value = Math.floor(logicalWidth / barCellWidth);
    } else {
      maxBars.value = Math.floor(logicalWidth / 3);
    }
    // console.log(`Calculated maxBars: ${maxBars.value} for logicalWidth: ${logicalWidth}`);
  }
};

const resizeCanvas = () => {
  if (canvasEl.value && canvasContext.value) {
    const dpr = window.devicePixelRatio || 1;
    const newLogicalWidth = canvasEl.value.offsetWidth;
    const newLogicalHeight = canvasEl.value.offsetHeight;

    canvasEl.value.width = newLogicalWidth * dpr;
    canvasEl.value.height = newLogicalHeight * dpr;

    // Set the transformation matrix. This effectively means all subsequent drawing
    // operations on the context use logical pixel coordinates.
    // It should be called after canvas dimensions change and before redrawing.
    canvasContext.value.setTransform(dpr, 0, 0, dpr, 0, 0);

    calculateMaxBars(); // Recalculate based on new logical width (offsetWidth)

    // No explicit drawLiveWaveform() call needed here, liveWaveformLoop handles continuous drawing.
  }
};

const updateBarData = () => {
  if (!analyserNode.value || !timeDomainDataArray.value || maxBars.value <= 0) {
    return;
  }
  analyserNode.value.getByteTimeDomainData(timeDomainDataArray.value);
  let peakValue = 0;
  for (let i = 0; i < timeDomainDataArray.value.length; i++) {
    const amplitude = Math.abs(timeDomainDataArray.value[i] - 128);
    if (amplitude > peakValue) {
      peakValue = amplitude;
    }
  }
  const normalizedHeight = peakValue / 128.0;
  barHeightsData.value.push(normalizedHeight);
  while (barHeightsData.value.length > maxBars.value && maxBars.value > 0) {
    barHeightsData.value.shift();
  }
};

const updateDotLineData = () => {
  const defaultScrollSpeed = 0.5;
  const defaultDotSpacing = 10;
  const speed = props.dotLineOptions?.scrollSpeed ?? defaultScrollSpeed;
  const spacingCycle = props.dotLineOptions?.spacing ?? defaultDotSpacing;
  if (spacingCycle <= 0) { return; }
  dotLineOffset.value = (dotLineOffset.value + speed) % spacingCycle;
};

function drawLiveWaveform() {
  if (!canvasContext.value || !canvasEl.value) return;
  const ctx = canvasContext.value;
  const canvas = canvasEl.value;

  // Using offsetWidth/Height for logical dimensions, assuming canvas.width/height
  // are correctly set by resizeCanvas to physical_pixels = logical_pixels * dpr.
  // And ctx.setTransform(dpr, 0, 0, dpr, 0, 0) has been called.
  // So, all drawing commands to ctx use logical pixel values.
  const logicalWidth = canvas.offsetWidth;
  const logicalHeight = canvas.offsetHeight;

  ctx.clearRect(0, 0, logicalWidth, logicalHeight);

  const barColor = props.options?.barColor || '#dddddd';
  const barWidth = props.options?.barWidth || 2;
  const barGap = props.options?.barGap || 0;
  const alignment = props.options?.alignment || 'center';
  const cellWidth = barWidth + barGap;

  const dotColor = props.dotLineOptions?.color || 'rgba(128,128,128,0.5)';
  const dotSize = props.dotLineOptions?.dotSize || 2;
  const dotSpacing = props.dotLineOptions?.spacing || 10;

  if (alignment === 'center' || alignment === 'mirror') {
    ctx.fillStyle = dotColor;
    const lineY = logicalHeight / 2;
    for (let x = -dotLineOffset.value; x < logicalWidth; x += dotSpacing) {
      ctx.fillRect(x, lineY - dotSize / 2, dotSize, dotSize);
    }
  }

  ctx.fillStyle = barColor;
  const numVisibleBars = barHeightsData.value.length;
  for (let i = 0; i < numVisibleBars; i++) {
    const normalizedHeight = barHeightsData.value[i];
    let maxAmplitudeVisualHeight = logicalHeight;
    if (alignment === 'mirror') {
      maxAmplitudeVisualHeight = logicalHeight / 2;
    }
    let currentBarMagnitude = normalizedHeight * maxAmplitudeVisualHeight * 0.95;
    if (currentBarMagnitude > 0 && currentBarMagnitude < 1) currentBarMagnitude = 1;
    if (currentBarMagnitude <= 0) continue;
    const xPos = logicalWidth - (numVisibleBars - i) * cellWidth + (barGap / 2);
    if (alignment === 'mirror') {
      ctx.fillRect(xPos, logicalHeight / 2 - currentBarMagnitude, barWidth, currentBarMagnitude);
      ctx.fillRect(xPos, logicalHeight / 2, barWidth, currentBarMagnitude);
    } else if (alignment === 'center') {
      const yPos = (logicalHeight - currentBarMagnitude) / 2;
      ctx.fillRect(xPos, yPos, barWidth, currentBarMagnitude);
    } else {
      const yPos = logicalHeight - currentBarMagnitude;
      ctx.fillRect(xPos, yPos, barWidth, currentBarMagnitude);
    }
  }
}

const liveWaveformLoop = (timestamp?: DOMHighResTimeStamp) => {
  if (!analyserNode.value || !canvasContext.value) {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }
    return;
  }
  updateBarData();
  updateDotLineData();
  drawLiveWaveform();
  animationFrameId.value = requestAnimationFrame(liveWaveformLoop);
};

const cleanupAudioResources = () => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }
  if (mediaStreamSource.value) {
    try { mediaStreamSource.value.disconnect(); } catch(e) { /* ignore */ }
    mediaStreamSource.value = null;
  }
  analyserNode.value = null;
  if (audioContext.value && audioContext.value.state !== 'closed') {
    audioContext.value.close().catch(e => console.warn("Error closing AudioContext:", e));
  }
  audioContext.value = null;
};

const setupAudioAnalysis = (streamToProcess: MediaStream | null) => {
  cleanupAudioResources();
  if (!streamToProcess) { return; }
  if (!canvasEl.value) { return; }
  if (!canvasContext.value) { // Should have been set in onMounted by resizeCanvas
      const ctx = canvasEl.value.getContext('2d');
      if (ctx) {
        canvasContext.value = ctx;
        // If context is obtained here, resizeCanvas might not have run or failed to get context.
        // Call resizeCanvas to ensure DPR scaling is applied before drawing.
        resizeCanvas();
      }
      else { console.error("Failed to get 2D context in setupAudioAnalysis."); return; }
  }
  try {
    const newAudioContext = new AudioContext();
    audioContext.value = newAudioContext;
    mediaStreamSource.value = newAudioContext.createMediaStreamSource(streamToProcess);
    analyserNode.value = newAudioContext.createAnalyser();
    analyserNode.value.fftSize = 256;
    analyserNode.value.smoothingTimeConstant = 0.3;
    timeDomainDataArray.value = new Uint8Array(analyserNode.value.frequencyBinCount);
    mediaStreamSource.value.connect(analyserNode.value);
    calculateMaxBars();
    if (animationFrameId.value === null) {
      animationFrameId.value = requestAnimationFrame(liveWaveformLoop);
    }
  } catch (error) {
    console.error("Error setting up audio analysis:", error);
    cleanupAudioResources();
  }
};

onMounted(() => {
  if (canvasEl.value) {
    const ctx = canvasEl.value.getContext('2d');
    if (ctx) {
      canvasContext.value = ctx;
      resizeCanvas(); // Set initial size, DPR, and calculate maxBars

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(canvasEl.value);
      } else {
        console.warn("ResizeObserver not supported. Canvas might not resize dynamically.");
      }
    } else {
      console.error("Failed to get 2D context on mount.");
    }
  }
  // calculateMaxBars(); // Already called by resizeCanvas
  if (props.stream) {
    setupAudioAnalysis(props.stream);
  }
});

watch(() => props.stream, (newStream, oldStream) => {
  if (newStream !== oldStream) {
    setupAudioAnalysis(newStream);
  }
});

onUnmounted(() => {
  if (resizeObserver && canvasEl.value) {
    resizeObserver.unobserve(canvasEl.value);
  }
  resizeObserver = null;
  cleanupAudioResources();
});

</script>

<template>
  <canvas ref="canvasEl" class="w-full h-full"></canvas>
</template>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
