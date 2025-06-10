export async function convertBlobToWav(blob: Blob): Promise<Blob> {
  const audioCtx = new AudioContext();
  const arrayBuffer = await blob.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length * numChannels * 2 + 44; // 16-bit samples + WAV header
  const wavBuffer = new ArrayBuffer(length);
  const view = new DataView(wavBuffer);

  // Write WAV header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  let offset = 0;

  writeString(offset, 'RIFF'); offset += 4;
  view.setUint32(offset, length - 8, true); offset += 4;
  writeString(offset, 'WAVE'); offset += 4;
  writeString(offset, 'fmt '); offset += 4;
  view.setUint32(offset, 16, true); offset += 4; // PCM
  view.setUint16(offset, 1, true); offset += 2;  // Linear quantization
  view.setUint16(offset, numChannels, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * numChannels * 2, true); offset += 4;
  view.setUint16(offset, numChannels * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;

  writeString(offset, 'data'); offset += 4;
  view.setUint32(offset, length - offset - 4, true); offset += 4;

  // Write PCM data
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = audioBuffer.getChannelData(ch)[i];
      const int16 = Math.max(-1, Math.min(1, sample)) * 32767;
      view.setInt16(offset, int16, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
}
