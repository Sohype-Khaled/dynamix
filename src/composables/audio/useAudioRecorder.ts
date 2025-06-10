import {onUnmounted, ref} from 'vue';

interface AudioRecorderOptions {
  mimeType?: string;
}

export function useAudioRecorder(options: AudioRecorderOptions = {}) {
  const permissionState = ref<PermissionState>('prompt');
  const isRecording = ref(false);
  const isPaused = ref(false);
  const error = ref<string | null>(null); // <-- Error message

  const elapsedSeconds = ref(0);
  const formattedTime = ref('00:00');
  const intervalId = ref<number | null>(null);

  const audioChunks = ref<Blob[]>([]);
  const audioBlob = ref<Blob | null>(null);
  const audioUrl = ref<string | null>(null);

  const mediaStream = ref<MediaStream | null>(null);
  const mediaRecorder = ref<MediaRecorder | null>(null);

  async function requestPermission() {
    error.value = null;
    try {
      mediaStream.value = await navigator.mediaDevices.getUserMedia({audio: true});
      permissionState.value = 'granted';
    } catch (err: any) {
      console.warn('Microphone access denied:', err);
      permissionState.value = 'denied';
      error.value = 'Microphone access denied. Please check browser permissions.';
    }
  }

  async function start() {
    reset();
    error.value = null;

    if (!mediaStream.value) {
      await requestPermission();
    }

    if (!mediaStream.value) {
      error.value = 'Microphone stream could not be initialized.';
      return;
    }

    const mimeType = options.mimeType || 'audio/webm';
    try {
      const recorder = new MediaRecorder(mediaStream.value, {mimeType});

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.value.push(e.data);
      };

      recorder.onstop = () => {
        if (audioUrl.value) {
          URL.revokeObjectURL(audioUrl.value);
        }
        audioBlob.value = new Blob(audioChunks.value, {type: mimeType});
        audioUrl.value = URL.createObjectURL(audioBlob.value);
      };

      mediaRecorder.value = recorder;
      audioChunks.value = [];

      recorder.start();
      isRecording.value = true;
      isPaused.value = false;

      if (intervalId.value) clearInterval(intervalId.value);
      elapsedSeconds.value = 0;
      formattedTime.value = '00:00';

      intervalId.value = window.setInterval(() => {
        elapsedSeconds.value++;
        const minutes = Math.floor(elapsedSeconds.value / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds.value % 60).toString().padStart(2, '0');
        formattedTime.value = `${minutes}:${seconds}`;
      }, 1000);
    } catch (err: any) {
      console.error('Failed to start recording:', err);
      error.value = 'Recording could not start. Unsupported format or hardware issue.';
    }
  }

  function pause() {
    if (mediaRecorder.value?.state === 'recording') {
      mediaRecorder.value.pause();
      isPaused.value = true;
      isRecording.value = false;
    }
  }

  function resume() {
    if (mediaRecorder.value?.state === 'paused') {
      mediaRecorder.value.resume();
      isPaused.value = false;
      isRecording.value = true;
    }
  }

  function stop() {
    if (mediaRecorder.value?.state !== 'inactive') {
      mediaRecorder.value?.stop();
    }

    mediaStream.value?.getTracks().forEach((track) => track.stop());
    isRecording.value = false;
    isPaused.value = false;

    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  }

  function reset() {
    if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
      void new Promise<void>((resolve) => {
        const recorder = mediaRecorder.value!;
        recorder.onstop = () => {
          cleanup();
          resolve();
        };
        recorder.stop(); // This will eventually trigger onstop
      });
    } else {
      cleanup();
      void Promise.resolve();
    }
  }

  function cleanup() {
    mediaStream.value?.getTracks().forEach((track) => track.stop());

    audioChunks.value = [];
    audioBlob.value = null;
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value);
      audioUrl.value = null;
    }
    elapsedSeconds.value = 0;
    formattedTime.value = '00:00';
    isRecording.value = false;
    isPaused.value = false;

    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }

    mediaRecorder.value = null;
    mediaStream.value = null;
    error.value = null;
  }

  async function fastStart() {
    error.value = null;

    if (permissionState.value !== 'granted') {
      await requestPermission();
    }

    if (permissionState.value === 'granted') {
      await start();
    } else {
      error.value = 'Microphone permission is required to start recording.';
    }
  }

  function revokeAudioUrl() {
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value);
      audioUrl.value = null;
      audioBlob.value = null;
    }
  }

  onUnmounted(() => {
    stop();
    void reset();
  });

  return {
    isRecording,
    isPaused,
    formattedTime,
    elapsedSeconds,
    audioUrl,
    audioBlob,
    error,
    requestPermission,
    start,
    pause,
    resume,
    stop,
    reset,
    fastStart,
    revokeAudioUrl
  };
}
