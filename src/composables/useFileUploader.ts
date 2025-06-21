import { readonly, ref } from "vue";
import type { UploadController } from "@/types/uploader";

export function useFileUploader(options: UploadController) {
  const controller: UploadController = options;
  const abortController = ref<AbortController>(new AbortController());
  const chunks = ref<Blob[]>([]);
  const chunkChecksums = ref<string[]>([]);
  const chunkSize = controller.chunkSize ?? 1024 * 1024;
  const uploadId = ref<string>('');
  const isAborted = ref(false);
  const isUploading = ref(false);

  const resetState = () => {
    chunks.value = [];
    chunkChecksums.value = [];
    uploadId.value = '';
    isAborted.value = false;
    abortController.value = new AbortController();
  };

  const splitFileToChunks = async (file: File): Promise<void> => {
    if (!file.size) throw new Error("Empty file");

    chunks.value = [];
    chunkChecksums.value = [];
    let offset = 0;

    while (offset < file.size) {
      const end = Math.min(offset + chunkSize, file.size);
      const chunk = file.slice(offset, end);
      chunks.value.push(chunk);

      const checksum = await computeSHA256(chunk);
      chunkChecksums.value.push(checksum);

      offset = end;
    }
  };

  const computeSHA256 = async (blob: Blob): Promise<string> => {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to compute checksum: ${error.message}`);
      }
      throw new Error('Failed to compute checksum: Unknown error occurred');
    }
  };

  const uploadChunk = async (partNumber: number, chunk: Blob) => {
    if (!chunkChecksums.value[partNumber - 1]) {
      throw new Error(`Missing checksum for chunk ${partNumber}`);
    }

    const { checksum: serverChecksum } = await controller.uploadChunk(
      uploadId.value,
      partNumber,
      chunk,
      chunkChecksums.value[partNumber - 1],
      abortController.value.signal
    );

    if (serverChecksum !== chunkChecksums.value[partNumber - 1]) {
      throw new Error(`Checksum mismatch for chunk ${partNumber}`);
    }

    return true;
  };

  const uploadChunks = async () => {
    for (let i = 0; i < chunks.value.length; i++) {
      if (isAborted.value) break;

      let retries = controller.maxRetries ?? 3;
      let lastError: Error | null = null;

      while (retries > 0 && !isAborted.value) {
        try {
          await uploadChunk(i + 1, chunks.value[i]);
          controller.onProgress(((i + 1) / chunks.value.length) * 100);
          break;
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          retries--;
          if (retries === 0) {
            throw lastError;
          }
        }
      }
    }
  };

  const complete = async (file: File) => {
    try {
      const fullChecksum = await computeSHA256(file);
      const response = await controller.complete(uploadId.value);

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid server response format');
      }

      const { checksum } = response;

      if (!checksum) {
        throw new Error('Server did not return a checksum');
      }

      if (checksum !== fullChecksum) {
        throw new Error('Final checksum verification failed');
      }

      controller.onComplete();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      controller.onError(new Error(`Final verification error: ${errorMessage}`));
      throw error;
    }
  };

  const abort = () => {
    if (!isUploading.value) return;

    isAborted.value = true;
    abortController.value.abort();
    controller.abort();
    controller.onCancel();
    resetState();
  };

  const upload = async (file: File) => {
    if (isUploading.value) {
      throw new Error("Upload already in progress");
    }

    try {
      isUploading.value = true;
      resetState();

      await splitFileToChunks(file);

      const result = await controller.start(file, chunks.value.length);
      uploadId.value = result.uploadId;

      await uploadChunks();

      if (!isAborted.value) {
        await complete(file);
      }
    } catch (error) {
      if (!isAborted.value) {
        controller.onError(error);
      }
      throw error;
    } finally {
      isUploading.value = false;
    }
  };

  return {
    upload,
    abort,
    isUploading: readonly(isUploading),
    uploadId,
  };
}
