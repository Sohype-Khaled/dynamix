import {ref} from "vue";
import type {UploadController} from "@/types/uploader";


export function useFileUploader(options: UploadController) {
  const controller: UploadController = options;
  const abortController = new AbortController();
  const chunks = ref<Blob[]>([]);
  const chunkChecksums = ref<string[]>([]);
  const chunkSize = controller.chunkSize ?? 1024 * 1024;
  const uploadId = ref<string>('');
  const isAborted = ref(false);

  const splitFileToChunks = async (file: File): Promise<void> => {
    chunks.value = [];
    chunkChecksums.value = []; // Reset checksums
    let offset = 0;

    while (offset < file.size) {
      const end = offset + chunkSize;
      const chunk = file.slice(offset, end);
      chunks.value.push(chunk);

      // Compute and store checksum for this chunk
      const checksum = await computeSHA256(chunk);
      chunkChecksums.value.push(checksum);

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
    const checksum = chunkChecksums.value[partNumber - 1]; // Retrieve precomputed checksum
    const { checksum: serverChecksum } = await controller.uploadChunk(
      uploadId.value,
      partNumber,
      chunk,
      checksum,
      abortController.signal
    );

    if (serverChecksum !== checksum) {
      throw new Error(`Checksum mismatch for chunk ${partNumber}`);
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
    try {
      const fullChecksum = await computeSHA256(file);
      const { checksum } = await controller.complete(uploadId.value);

      if (!checksum) {
        throw new Error("Server did not return a checksum");
      }

      if (checksum !== fullChecksum) {
        throw new Error("Checksum mismatch");
      }

      controller.onComplete();
    } catch (error) {
      controller.onError(error);
      throw error; // Re-throw to stop the upload flow
    }
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
      const result = await controller.start(file, chunks.value.length);
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
