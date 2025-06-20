import {ref} from "vue";

export interface UploadController {
  // Properties
  chunkSize?: number,
  maxRetries?: number,

  // functions
  start: (file: File) => Promise<any & { uploadId: string }>;
  uploadChunk: (
    uploadId: string,
    partNumber: number,
    chunk: Blob,
    checksum: string,
    abortSignal: AbortSignal
  ) => Promise<any & { checksum: string }>;
  complete: (uploadId: string, checksum: string) => any;
  abort: () => any;

  // callbacks
  onProgress: (progress: number) => void;
  onCancel: () => any;
  onComplete: () => any;
  onError: (error: any) => void;
}

export function useFileUploader(options: UploadController) {
  const controller: UploadController = options;
  const abortController = new AbortController();
  const chunks = ref<Blob[]>([]);
  const chunkSize = controller.chunkSize ?? 1024 * 1024;
  const uploadId = ref<string>('');
  const isAborted = ref(false);

  const splitFileToChunks = (file: File): void => {
    chunks.value = [];
    let offset = 0;
    while (offset < file.size) {
      const end = offset + chunkSize;
      chunks.value.push(file.slice(offset, end));
      offset = end;
    }
  };

  const computeSHA256 = async (blob: Blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const uploadChunk = async (partNumber: number, chunk: Blob) => {
    const checksum = await computeSHA256(chunk);
    const {checksum: resChecksum} = await controller.uploadChunk(
      uploadId.value,
      partNumber,
      chunk,
      checksum,
      abortController.signal
    );

    if (resChecksum && resChecksum !== checksum) {
      throw new Error("Checksum mismatch");
    }

    return true;
  };

  const uploadChunks = async () => {
    for (let i = 0; i < chunks.value.length; i++) {
      const chunk = chunks.value[i];
      let retries = controller.maxRetries ?? 3;
      let success = false;

      while (retries > 0 && !success && !isAborted.value) {
        try {
          success = await uploadChunk(i + 1, chunk);
        } catch (error) {
          retries--;
          if (retries === 0) {
            controller.onError(error);
            throw error;
          }
        }
      }

      controller.onProgress(((i + 1) / chunks.value.length) * 100);
    }
  };

  const complete = async (file: File) => {
    const fullChecksum = await computeSHA256(file);
    await controller.complete(uploadId.value, fullChecksum);
    controller.onComplete();
  };

  const abort = () => {
    isAborted.value = true;
    abortController.abort();
    controller.abort();
    controller.onCancel();
  };

  const upload = async (file: File) => {
    try {
      isAborted.value = false;
      splitFileToChunks(file);
      const result = await controller.start(file);
      uploadId.value = result.uploadId;
      await uploadChunks();
      if (!isAborted.value) await complete(file);
    } catch (e) {
      if (!isAborted.value) {
        controller.onError(e);
      }
    }
  };

  return {
    upload,
    abort,
  };
}
