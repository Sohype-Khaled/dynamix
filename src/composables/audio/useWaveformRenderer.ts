import {ref} from 'vue';

export type BarAlignment = 'bottom' | 'center' | 'mirror';

export interface WaveformRenderOptions {
  barCount?: number;
  barWidth?: number;
  maxHeight?: number;
  progressColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  hoverProgressColor?: string;
  hoverInactiveColor?: string;
  centerLineColor?: string;
  alignment?: BarAlignment;
}

export function useWaveformRenderer(options: WaveformRenderOptions = {}) {
  const barHeights = ref<number[]>([]);
  const hoverX = ref(0);
  const isHovering = ref(false);

  const config = {
    barCount: undefined,
    barWidth: undefined,
    maxHeight: undefined,
    progressColor: '#4a89dc',
    inactiveColor: '#ddd',
    hoverColor: 'rgba(255, 255, 255, 0.3)',
    hoverProgressColor: '#2d6cc6',
    hoverInactiveColor: '#c5c5c5',
    centerLineColor: 'rgba(0, 0, 0, 0.1)',
    alignment: 'bottom' as BarAlignment,
    ...options,
  };

  let animationId: number | null = null;
  let analyser: AnalyserNode | null = null;
  let sourceNode: MediaStreamAudioSourceNode | null = null;
  let stream: MediaStream | null = null;

  // Audio file rendering
  async function extractWaveformFromAudio(
    url: string,
    canvas: HTMLCanvasElement,
    context: AudioContext
  ) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);

    const rawData = audioBuffer.getChannelData(0);

    let actualBarCount = config.barCount;
    if (!actualBarCount && config.barWidth) {
      actualBarCount = Math.floor(canvas.width / config.barWidth);
    }
    if (!actualBarCount) actualBarCount = 100;

    const samplesPerBar = Math.floor(rawData.length / actualBarCount);
    const bars: number[] = [];

    for (let i = 0; i < actualBarCount; i++) {
      let sum = 0;
      for (let j = 0; j < samplesPerBar; j++) {
        sum += Math.abs(rawData[i * samplesPerBar + j] || 0);
      }
      const avg = sum / samplesPerBar;
      bars.push(avg);
    }

    const max = Math.max(...bars);
    const height = canvas.height / (window.devicePixelRatio || 1);

    barHeights.value = bars.map(v => {
      let normalized = (v / max) * height * 0.8;
      if (config.maxHeight) normalized = Math.min(normalized, config.maxHeight);
      return Math.max(2, normalized);
    });
  }

  // Live waveform rendering
  async function renderLiveStreamFromMic(canvas: HTMLCanvasElement, context: AudioContext) {
    stopLiveRendering();

    stream = await navigator.mediaDevices.getUserMedia({audio: true});
    sourceNode = context.createMediaStreamSource(stream);
    analyser = context.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 100 * dpr;
    canvas.getContext('2d')?.scale(dpr, dpr);

    const draw = () => {
      if (!analyser) return;
      analyser.getByteTimeDomainData(dataArray);

      const count = config.barCount || Math.floor(canvas.width / (config.barWidth || 4));
      const step = Math.floor(dataArray.length / count);
      const height = canvas.height / dpr;

      const bars = [];
      for (let i = 0; i < count; i++) {
        const val = dataArray[i * step] / 128.0 - 1.0;
        bars.push(Math.abs(val));
      }

      const max = Math.max(...bars);
      barHeights.value = bars.map(v => {
        let normalized = (v / max) * height * 0.8;
        if (config.maxHeight) normalized = Math.min(normalized, config.maxHeight);
        return Math.max(2, normalized);
      });

      drawBars(canvas);
      animationId = requestAnimationFrame(draw);
    };

    draw();
  }

  // Static update (for pre-extracted waveform)
  const updateWaveform = (
    canvas: HTMLCanvasElement,
    progress: number = 0
  ) => {
    drawBars(canvas, progress);
  };

  function drawBars(canvas: HTMLCanvasElement, progress: number = 0) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);
    const count = barHeights.value.length;
    const barWidth = count > 0 ? width / count : 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const hoverIndex = Math.floor(hoverX.value / barWidth);

    for (let i = 0; i < count; i++) {
      const barHeight = barHeights.value[i];
      const x = i * barWidth;
      const y = getBarY(height, barHeight);
      const isActive = (x + barWidth) / width <= progress;
      const isHovered = isHovering.value && i <= hoverIndex;

      ctx.fillStyle = isHovered
        ? (isActive ? config.hoverProgressColor : config.hoverInactiveColor)
        : (isActive ? config.progressColor : config.inactiveColor);

      ctx.fillRect(x, y, barWidth * 0.8, getRenderBarHeight(barHeight));
    }

    if (isHovering.value) {
      ctx.fillStyle = config.hoverColor;
      ctx.fillRect(0, 0, hoverX.value, height);
    }

    if (config.alignment === 'center' || config.alignment === 'mirror') {
      ctx.strokeStyle = config.centerLineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }
  }

  function getBarY(canvasHeight: number, barHeight: number): number {
    switch (config.alignment) {
      case 'center':
        return (canvasHeight - barHeight) / 2;
      case 'mirror':
        return canvasHeight / 2 - barHeight;
      case 'bottom':
      default:
        return canvasHeight - barHeight;
    }
  }

  function getRenderBarHeight(barHeight: number): number {
    return config.alignment === 'mirror' ? barHeight * 2 : barHeight;
  }

  function stopLiveRendering() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }

    if (sourceNode) {
      sourceNode.disconnect();
      sourceNode = null;
    }

    if (analyser) {
      analyser.disconnect();
      analyser = null;
    }
  }

  function drawBar(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');


  }

  return {
    barHeights,
    hoverX,
    isHovering,
    extractWaveformFromAudio,
    updateWaveform,
    renderLiveStreamFromMic,
    stopLiveRendering,
  };
}
