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

  const setup = async (el: HTMLAudioElement) => {
    audioEl.value = el;
    await nextTick();

    if (!audioContext.value) {
      audioContext.value = new AudioContext();
      ctxSource = audioContext.value.createMediaElementSource(audioEl.value);
      ctxSource.connect(audioContext.value.destination);
    }

    duration.value = 0;
    currentTime.value = 0;

    audioEl.value.volume = volume.value;
    audioEl.value.playbackRate = playbackRate.value;

    audioEl.value.onloadedmetadata = () => {
      // Ensure we have a valid duration
      if (Number.isFinite(audioEl.value!.duration)) {
        duration.value = audioEl.value!.duration;
      } else {
        duration.value = 0; // Fallback to 0 if invalid
      }
    };

    audioEl.value.onerror = () => {
      // Handle errors gracefully
      duration.value = 0;
      currentTime.value = 0;
    };

    audioEl.value.ontimeupdate = () => {
      currentTime.value = audioEl.value!.currentTime;
    };

    audioEl.value.onended = () => {
      isPlaying.value = false;
    };


    hasLoaded.value = true;
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

  watch(resolvedSrc, (newSrc) => {
    if (audioEl.value) {
      // Reset duration while new source loads
      duration.value = 0;
      audioEl.value.src = newSrc || '';
      audioEl.value.load(); // Explicitly load the new source
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
