export interface UploadController {
  // Properties
  chunkSize?: number,
  maxRetries?: number,

  // functions
  start: (file: File, totalParts: number) => Promise<any & { uploadId: string }>;
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