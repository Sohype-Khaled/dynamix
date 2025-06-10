import {onUnmounted, ref} from 'vue';

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
  const finalBarHeights = ref<number[]>([]); // Renamed from barHeights

  const hoverX = ref(0);
  const isHovering = ref(false);

  // State for Center Line Animation
  const isCenterLineAnimating = ref<boolean>(false);
  const centerLineProgress = ref<number>(0); // 0 to 1
  const animationFrameIdLine = ref<number | null>(null); // Renamed from animationFrameId

  // State for Bars Animation
  const isBarsAnimating = ref<boolean>(false);
  const barsAppearProgress = ref<number>(0); // 0 to 1 (overall progress of bars appearing)
  const animationFrameIdBars = ref<number | null>(null);

  const animationConfig = {
    lineDuration: 600, // ms for center line animation
    barsDuration: 600  // ms for all bars to appear sequentially
  };

  // Canvas and Context storage
  const canvasElement = ref<HTMLCanvasElement | null>(null);
  const canvasContext = ref<CanvasRenderingContext2D | null>(null);
  const hasCanvasInitialized = ref<boolean>(false);

  let currentPhaseStartTime: number | null = null; // Used for timing both line and bars animation phases

  // Stubs for functions to be implemented in later steps
  function startCenterLineAnimation() {
    // console.log("Starting center line animation."); // For debugging
    isCenterLineAnimating.value = true;
    centerLineProgress.value = 0;
    currentPhaseStartTime = null; // Reset start time for this animation phase

    if (animationFrameIdLine.value) {
      cancelAnimationFrame(animationFrameIdLine.value);
    }

    animationFrameIdLine.value = requestAnimationFrame(timestamp => lineAnimationLoop(timestamp));
  }

  function lineAnimationLoop(timestamp: DOMHighResTimeStamp) {
    if (!isCenterLineAnimating.value) {
      // console.log("Line animation cancelled or already stopped."); // For debugging
      return;
    }

    if (currentPhaseStartTime === null) {
      currentPhaseStartTime = timestamp;
      // console.log("Line animation first frame. Start time:", currentPhaseStartTime); // For debugging
    }

    const elapsed = timestamp - currentPhaseStartTime;
    const progress = Math.min(elapsed / animationConfig.lineDuration, 1);
    centerLineProgress.value = progress;

    // Call the main drawing function. It will use centerLineProgress.value.
    // Passing 0 for playbackProgress as it's not relevant to this initial animation.
    drawWaveform(0);

    if (progress < 1) {
      animationFrameIdLine.value = requestAnimationFrame(timestamp => lineAnimationLoop(timestamp));
    } else {
      // console.log("Line animation complete."); // For debugging
      isCenterLineAnimating.value = false;
      animationFrameIdLine.value = null;
      // currentPhaseStartTime = null; // Optional: reset here, or rely on start... functions
    }
  }

  function startBarsAnimation() {
    // console.log("Starting bars animation."); // For debugging
    isBarsAnimating.value = true;
    barsAppearProgress.value = 0;
    currentPhaseStartTime = null; // Reset start time for this animation phase

    if (animationFrameIdBars.value) {
      cancelAnimationFrame(animationFrameIdBars.value);
    }

    animationFrameIdBars.value = requestAnimationFrame(timestamp => barsAnimationLoop(timestamp));
  }

  function barsAnimationLoop(timestamp: DOMHighResTimeStamp) {
    if (!isBarsAnimating.value) {
      // console.log("Bars animation cancelled or already stopped."); // For debugging
      return;
    }

    if (currentPhaseStartTime === null) {
      currentPhaseStartTime = timestamp;
      // console.log("Bars animation first frame. Start time:", currentPhaseStartTime); // For debugging
    }

    const elapsed = timestamp - currentPhaseStartTime;
    const progress = Math.min(elapsed / animationConfig.barsDuration, 1);
    barsAppearProgress.value = progress;

    // Call the main drawing function. It will use barsAppearProgress.value.
    // Passing 0 for playbackProgress as it's not relevant to this initial animation.
    drawWaveform(0);

    if (progress < 1) {
      animationFrameIdBars.value = requestAnimationFrame(timestamp => barsAnimationLoop(timestamp));
    } else {
      // console.log("Bars animation complete."); // For debugging
      isBarsAnimating.value = false;
      animationFrameIdBars.value = null;
      // currentPhaseStartTime = null; // Optional: reset here
    }
  }

  function drawWaveform(playbackProgress: number = 0) {
    if (!canvasContext.value || !canvasElement.value) {
      // console.warn("drawWaveform called before canvas/context initialized.");
      return;
    }

    const ctx = canvasContext.value;
    const canvas = canvasElement.value;
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    // --- 1. Center Line Drawing ---
    // Draw based on current animation progress or final state if initialized.
    let lineDrawLength = 0;
    if (hasCanvasInitialized.value) { // Only draw if canvas has been set up
      lineDrawLength = logicalWidth * centerLineProgress.value;
    }

    if ((config.alignment === 'center' || config.alignment === 'mirror') && lineDrawLength > 0) {
      ctx.strokeStyle = config.centerLineColor || 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1; // Logical pixel
      ctx.beginPath();
      ctx.moveTo(0, logicalHeight / 2);
      ctx.lineTo(lineDrawLength, logicalHeight / 2);
      ctx.stroke();
    }

    // --- 2. Bars Drawing ---
    const numBars = finalBarHeights.value.length;

    // Determine if bars should be drawn at all in this frame
    // Bars draw if:
    // 1. They are currently animating (isBarsAnimating.value is true)
    // OR
    // 2. All animations are complete (line is done, bars sequence is done)
    const allAnimationsComplete = !isCenterLineAnimating.value && centerLineProgress.value >= 1 &&
      !isBarsAnimating.value && barsAppearProgress.value >= 1;
    const shouldDrawBars = isBarsAnimating.value || allAnimationsComplete;

    if (numBars > 0 && shouldDrawBars) {
      const cellWidth = logicalWidth / numBars;
      const drawnBarVisualWidth = Math.max(1, Math.floor(cellWidth * 0.75));

      for (let i = 0; i < numBars; i++) {
        const barTargetHeight = finalBarHeights.value[i];
        let displayBarHeight = 0;

        if (isBarsAnimating.value) {
          const currentOverallBarsProgress = barsAppearProgress.value;
          // barStartSequencePoint: when this bar's "slot" begins in the 0-1 overall progress
          const barStartSequencePoint = i / numBars;
          // barEndSequencePoint: when this bar's "slot" ends
          const barEndSequencePoint = (i + 1) / numBars;

          if (currentOverallBarsProgress >= barEndSequencePoint) {
            displayBarHeight = barTargetHeight; // This bar is fully revealed in the sequence
          } else if (currentOverallBarsProgress > barStartSequencePoint) {
            // This bar is currently "growing" as the sequence sweeps past it.
            // Calculate its individual growth progress based on how far currentOverallBarsProgress is into this bar's "slot".
            const progressWithinThisBarSlot = (currentOverallBarsProgress - barStartSequencePoint) / (barEndSequencePoint - barStartSequencePoint);
            displayBarHeight = barTargetHeight * progressWithinThisBarSlot; // Linear growth from 0 to targetHeight
          }
          // else: displayBarHeight remains 0 (bar not yet reached in the appearance sequence)
        } else if (allAnimationsComplete) {
          // Not animating bars, and all animations are complete, so draw at full target height
          displayBarHeight = barTargetHeight;
        }

        // Ensure a minimum of 1 logical pixel for visibility if it has any height
        if (displayBarHeight > 0 && displayBarHeight < 1) {
          displayBarHeight = 1;
        }

        if (displayBarHeight >= 1) { // Only draw if it has some visible height
          const barOffsetX = (cellWidth - drawnBarVisualWidth) / 2;
          const x = (i * cellWidth) + barOffsetX;
          const y = getBarY(logicalHeight, displayBarHeight); // getBarY uses the current (possibly animated) height
          const renderBarH = getRenderBarHeight(displayBarHeight); // Handles 'mirror' alignment correctly

          // Playback progress and hover effects
          const isActiveForPlayback = ((i + 1) * cellWidth) / logicalWidth <= playbackProgress;
          const isCurrentlyHovered = isHovering.value && i <= Math.floor(hoverX.value / cellWidth);

          ctx.fillStyle = isCurrentlyHovered
            ? (isActiveForPlayback ? config.hoverProgressColor : config.hoverInactiveColor)
            : (isActiveForPlayback ? config.progressColor : config.inactiveColor);

          ctx.fillRect(x, y, drawnBarVisualWidth, renderBarH);
        }
      }
    }

    // --- 3. Hover Overlay ---
    // Show hover effect if the line animation is complete.
    if (isHovering.value && config.hoverColor && centerLineProgress.value >= 1) {
      ctx.fillStyle = config.hoverColor;
      ctx.fillRect(0, 0, hoverX.value, logicalHeight); // hoverX is logical
    }
  }

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
    canvas: HTMLCanvasElement, // canvas instance from the component
    audioCtx: AudioContext // Renamed from context to avoid conflict with canvasContext.value
  ) {
    if (!hasCanvasInitialized.value) {
      canvasElement.value = canvas;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvasContext.value = ctx;
        // DPR scaling should be done once when canvas is first set up if needed by drawing logic later
        // For now, assume drawWaveform will handle logical/physical pixels if ctx.scale isn't used here.
        // Example of scaling (if not done in DXWaveformCanvas's resize):
        // const dpr = window.devicePixelRatio || 1;
        // canvasElement.value.width = canvasElement.value.offsetWidth * dpr;
        // canvasElement.value.height = canvasElement.value.offsetHeight * dpr;
        // ctx.scale(dpr, dpr);
        hasCanvasInitialized.value = true;
        startCenterLineAnimation();
      } else {
        console.error("Failed to get 2D context from canvas in extractWaveformFromAudio");
        return;
      }
    }

    // Audio data processing
    let bars: number[];
    let actualBarCountUsed: number;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const rawData = audioBuffer.getChannelData(0);

      actualBarCountUsed = config.barCount || 0;
      if (!actualBarCountUsed && config.barWidth && canvasElement.value) {
        const logicalCanvasWidth = canvasElement.value.width / (window.devicePixelRatio || 1);
        actualBarCountUsed = Math.floor(logicalCanvasWidth / config.barWidth);
      }
      if (!actualBarCountUsed) actualBarCountUsed = 100;
      if (actualBarCountUsed === 0) actualBarCountUsed = 1; // Prevent division by zero for samplesPerBar

      const samplesPerBar = Math.floor(rawData.length / actualBarCountUsed);
      if (samplesPerBar === 0) { // Not enough data for even one sample per bar
        finalBarHeights.value = new Array(actualBarCountUsed).fill(2); // Draw min height bars
        isBarsAnimating.value = false;
        barsAppearProgress.value = 0;
        if (animationFrameIdBars.value) {
          cancelAnimationFrame(animationFrameIdBars.value);
          animationFrameIdBars.value = null;
        }
        drawWaveform(0);
        return;
      }

      bars = [];
      for (let i = 0; i < actualBarCountUsed; i++) {
        let sum = 0;
        for (let j = 0; j < samplesPerBar; j++) {
          sum += Math.abs(rawData[i * samplesPerBar + j] || 0);
        }
        bars.push(sum / samplesPerBar);
      }
    } catch (e) {
      console.error("Error processing audio data:", e);
      finalBarHeights.value = [];
      isBarsAnimating.value = false;
      barsAppearProgress.value = 0;
      if (animationFrameIdBars.value) {
        cancelAnimationFrame(animationFrameIdBars.value);
        animationFrameIdBars.value = null;
      }
      drawWaveform(0);
      return;
    }

    const maxAudioValue = bars.length > 0 ? Math.max(...bars.filter(v => isFinite(v))) : 0;

    if (bars.length === 0 || maxAudioValue === 0) {
      finalBarHeights.value = [];
      isBarsAnimating.value = false;
      barsAppearProgress.value = 0;
      if (animationFrameIdBars.value) {
        cancelAnimationFrame(animationFrameIdBars.value);
        animationFrameIdBars.value = null;
      }
      drawWaveform(0);
      return;
    }

    if (!canvasElement.value) { // Should be set by now if initialized
      console.error("Canvas element not available for height calculation.");
      return;
    }
    const logicalCanvasHeight = canvasElement.value.height / (window.devicePixelRatio || 1);

    finalBarHeights.value = bars.map(v => {
      let normalized = (v / maxAudioValue) * logicalCanvasHeight * 0.8;
      return Math.max(2, normalized); // Min height 2px
    });

    startBarsAnimation();
  }




  // Static update (for pre-extracted waveform)
  // updateWaveform is called by DXWaveformCanvas when props.progress (playback progress) changes.
  // The first parameter from the calling component (DXWaveformCanvas) is the canvas element itself.
  const updateWaveform = (
    _canvasIgnored: HTMLCanvasElement, // Parameter received from DXWaveformCanvas, but we use internal canvasElement.value
    newPlaybackProgress: number = 0
  ) => {
    if (!hasCanvasInitialized.value) {
      // If the main canvas setup and initial data processing (via extractWaveformFromAudio)
      // haven't happened, there are no bars to update with playback progress.
      // The center line animation (if active) calls drawWaveform independently.
      // If drawWaveform is robust to canvasElement.value being null, this guard might be optional,
      // but it's safer to prevent drawing if canvas isn't fully ready for bar display.
      // (drawWaveform already has its own guard for null canvasElement/canvasContext)
      return;
    }

    // Call the main drawing function with the new playback progress.
    // drawWaveform will handle rendering based on current animation states and this playbackProgress.
    drawWaveform(newPlaybackProgress);
  };

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


  onUnmounted(() => {
    if (animationFrameIdLine.value) {
      cancelAnimationFrame(animationFrameIdLine.value);
    }
    if (animationFrameIdBars.value) {
      cancelAnimationFrame(animationFrameIdBars.value);
    }
  });

  return {
    hoverX,
    isHovering,
    extractWaveformFromAudio,
    updateWaveform,
  };
}
