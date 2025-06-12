import {onUnmounted, ref} from 'vue';

interface AudioRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  audioTrackConstraints?: MediaTrackConstraints;
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
      let audioConstraintsConfig: MediaTrackConstraints | boolean;

      if (options.audioTrackConstraints && typeof options.audioTrackConstraints === 'object') {
        // User has provided specific constraints for the audio track
        audioConstraintsConfig = options.audioTrackConstraints;
        // console.log('Using user-defined audioTrackConstraints:', JSON.stringify(audioConstraintsConfig)); // For debugging
      } else {
        // Default to disabling common audio processing for potentially clearer/rawer recording
        audioConstraintsConfig = {
          autoGainControl: false,
          noiseSuppression: false,
          echoCancellation: false,
          // Consider adding other defaults if needed, e.g.:
          // sampleRate: 48000,
          // channelCount: 1
        };
        // console.log('Using default audioTrackConstraints:', JSON.stringify(audioConstraintsConfig)); // For debugging
      }

      const mediaStreamConstraintsConfig: MediaStreamConstraints = { audio: audioConstraintsConfig };

      // console.log('Final MediaStreamConstraints for getUserMedia:', JSON.stringify(mediaStreamConstraintsConfig)); // For debugging

      mediaStream.value = await navigator.mediaDevices.getUserMedia(mediaStreamConstraintsConfig);
      permissionState.value = 'granted';
    } catch (err: any) {
      console.warn('Microphone access denied or error with constraints:', err);
      permissionState.value = 'denied';
      if (err.name === 'OverconstrainedError') {
        error.value = 'The specified audio constraints are not supported by your device/browser.';
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        error.value = 'Microphone access denied. Please check browser permissions.';
      } else {
        error.value = 'Could not access microphone. ' + (err.message || '');
      }
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

    let selectedMimeType: string;

    if (options.mimeType) {
      selectedMimeType = options.mimeType;
    } else {
      const preferredMimeTypes = [
        'audio/webm;codecs=opus',
        'audio/ogg;codecs=opus', // Opus in Ogg container
        'audio/webm;codecs=vorbis', // Vorbis in WebM as a fallback
        'audio/ogg;codecs=vorbis',  // Vorbis in Ogg
        'audio/webm',               // Generic WebM (browser will choose codec, often Opus/Vorbis)
        // 'audio/mp4', // Example: if MP4/AAC is desired, though less common for this use case
      ];

      let foundSupported = false;
      for (const type of preferredMimeTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedMimeType = type;
          foundSupported = true;
          // console.log(`Using preferred MIME type for recording: ${selectedMimeType}`); // Optional: for debugging
          break;
        }
      }
      if (!foundSupported) {
        selectedMimeType = 'audio/webm'; // Default fallback if no preferred types are supported
        // console.log(`Using fallback MIME type for recording: ${selectedMimeType}`); // Optional: for debugging
      }
    }

    // Prepare options for MediaRecorder constructor
    // @ts-ignore
    const mediaRecorderConstructorOptions: MediaRecorderOptions = { mimeType: selectedMimeType };

    if (options.audioBitsPerSecond && typeof options.audioBitsPerSecond === 'number' && options.audioBitsPerSecond > 0) {
      // User has provided a valid, positive bitrate
      mediaRecorderConstructorOptions.audioBitsPerSecond = options.audioBitsPerSecond;
    } else {
      // User has not provided a valid bitrate (it's undefined, null, zero, negative, or not a number).
      // Apply a default bitrate.
      mediaRecorderConstructorOptions.audioBitsPerSecond = 128000; // Default to 128kbps
      // console.log(`Using default audioBitsPerSecond: ${mediaRecorderConstructorOptions.audioBitsPerSecond}`); // Optional: for debugging
    }

    try {
      // Use the prepared options object
      const recorder = new MediaRecorder(mediaStream.value, mediaRecorderConstructorOptions);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.value.push(e.data);
      };

      recorder.onstop = () => {
        if (audioUrl.value) {
          URL.revokeObjectURL(audioUrl.value);
        }
        // IMPORTANT: Use selectedMimeType for Blob creation
        audioBlob.value = new Blob(audioChunks.value, { type: selectedMimeType });
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
    mediaStream,
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
