import {computed, isRef, nextTick, onUnmounted, type Ref, ref, watch} from 'vue';

const allPlayers = new Set<any>();

export function useAudioPlayer(src: string | Ref<string>) {
  const audioEl = ref<HTMLAudioElement | null>(null);
  const audioContext = ref<AudioContext | null>(null);
  const hasLoaded = ref(false);

  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(1);
  const audioBuffer = ref<AudioBuffer | null>(null);
  const playbackRate = ref(1);
  const resolvedSrc = isRef(src) ? src : ref(src);

  const progress = computed(() =>
    duration.value > 0 ? currentTime.value / duration.value : 0
  );

  const currentTimeFormatted = computed(() => format(currentTime.value));
  const durationFormatted = computed(() => format(duration.value));

  let ctxSource: MediaElementAudioSourceNode | null = null;

  function format(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  async function loadAudioSource(sourceUrl: string) {
    if (!audioEl.value) return;
    if (!audioContext.value) {
      console.warn('AudioContext not initialized yet. Cannot load audio source.');
      return;
    }

    // Reset state
    if (isPlaying.value) pause();
    currentTime.value = 0;
    duration.value = 0;
    hasLoaded.value = false;
    audioBuffer.value = null;

    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch audio: ' + response.statusText);
      }
      const arrayBufferData = await response.arrayBuffer();
      const decodedBuffer = await audioContext.value.decodeAudioData(arrayBufferData);
      audioBuffer.value = decodedBuffer;

      if (Number.isFinite(decodedBuffer.duration)) {
        duration.value = decodedBuffer.duration;
      } else {
        console.warn('Decoded audio buffer duration is not finite.');
      }

      if (audioEl.value) {
        audioEl.value.src = sourceUrl;
        audioEl.value.load(); // Important to load the source into the audio element
      }
      hasLoaded.value = true;
    } catch (e) {
      console.error("Error loading audio source:", e);
      // Reset state on error
      duration.value = 0;
      if (audioEl.value) audioEl.value.src = '';
      hasLoaded.value = false;
      audioBuffer.value = null;
    }
  }

  const setup = async (el: HTMLAudioElement) => {
    audioEl.value = el;
    await nextTick();

    if (!audioContext.value) {
      try {
        audioContext.value = new AudioContext();
        // Check if audioEl.value is still valid before creating source
        if (audioEl.value) {
          ctxSource = audioContext.value.createMediaElementSource(audioEl.value);
          ctxSource.connect(audioContext.value.destination);
        } else {
          console.error("audioEl became null before MediaElementSource creation");
          return; // Or handle error appropriately
        }
      } catch (e) {
        console.error("Error creating AudioContext:", e);
        // Fallback or error handling if AudioContext cannot be created
        return;
      }
    }

    // Initial values are set by loadAudioSource or by direct interaction
    // So, explicit reset here might be redundant if loadAudioSource is always called.
    // However, keeping some resets for safety if setup is called without immediate load.
    // duration.value = 0; // Will be set by loadAudioSource or onloadedmetadata
    // currentTime.value = 0; // Resetting currentTime is generally good

    if (audioEl.value) {
        audioEl.value.volume = volume.value;
        audioEl.value.playbackRate = playbackRate.value;

        audioEl.value.onloadedmetadata = () => {
            // Use duration from audioBuffer if available and valid, otherwise use audioEl.duration
            if (duration.value === 0 && audioEl.value && Number.isFinite(audioEl.value.duration)) {
                duration.value = audioEl.value.duration;
            }
            // Set hasLoaded if metadata loaded and duration is positive
            // This might be redundant if loadAudioSource sets hasLoaded correctly
            if (!hasLoaded.value && audioEl.value && audioEl.value.duration > 0) {
                hasLoaded.value = true;
            }
        };

        audioEl.value.onerror = () => {
            console.error("Error in audio element:", audioEl.value?.error);
            // Reset relevant state on error
            duration.value = 0;
            currentTime.value = 0;
            isPlaying.value = false;
            hasLoaded.value = false;
            // Potentially reset src or attempt to reload?
        };

        audioEl.value.ontimeupdate = () => {
            if (audioEl.value) {
                currentTime.value = audioEl.value.currentTime;
            }
        };

        audioEl.value.onended = () => {
            isPlaying.value = false;
            // Optionally reset currentTime to 0 or loop
            // currentTime.value = 0;
        };
    }

    // Initial Load
    if (resolvedSrc.value) {
      await loadAudioSource(resolvedSrc.value);
    } else {
      // If no source, ensure hasLoaded is false.
      hasLoaded.value = false;
    }
  };

  const play = async () => {
    pauseOthers();
    if (audioContext.value?.state === 'suspended') {
      await audioContext.value.resume();
    }
    await audioEl.value?.play();
    isPlaying.value = true;
  };

  const pause = () => {
    audioEl.value?.pause();
    isPlaying.value = false;
  };

  const stop = () => {
    if (audioEl.value) {
      audioEl.value.pause();
      audioEl.value.currentTime = 0;
      isPlaying.value = false;
    }
  };

  const seek = (p: number) => {
    if (audioEl.value && duration.value) {
      audioEl.value.currentTime = p * duration.value;
    }
  };

  const setVolume = (v: number) => {
    volume.value = v;
    if (audioEl.value) audioEl.value.volume = v;
  };

  const togglePlay = async () => {
    isPlaying.value ? pause() : await play();
  };

  const pauseOthers = () => {
    for (const player of allPlayers) {
      if (player !== api) player.pause();
    }
  };

  const setPlaybackRate = (rate: number) => {
    playbackRate.value = rate;
    if (audioEl.value) {
      audioEl.value.playbackRate = rate;
    }
  };

  watch(resolvedSrc, async (newSrc, oldSrc) => {
    if (newSrc && newSrc !== oldSrc) {
      await loadAudioSource(newSrc);
    } else if (!newSrc && audioEl.value) {
      if (isPlaying.value) pause();
      audioEl.value.src = '';
      duration.value = 0;
      currentTime.value = 0;
      hasLoaded.value = false;
      audioBuffer.value = null;
    }
  });

  const api = {
    setup,
    audioEl,
    audioContext,
    hasLoaded,

    isPlaying,
    currentTime,
    duration,
    volume,
    progress,
    currentTimeFormatted,
    durationFormatted,
    playbackRate,

    play,
    pause,
    stop,
    seek,
    setVolume,
    togglePlay,
    setPlaybackRate
  };

  allPlayers.add(api);
  onUnmounted(() => {
    allPlayers.delete(api);
    stop();
  });

  return api;
}
