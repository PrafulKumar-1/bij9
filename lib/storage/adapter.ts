export type UploadAssetArgs = {
  file: File;
  folder?: string;
};

export type StoredAsset = {
  data: ArrayBuffer;
  contentType: string;
  etag?: string;
};

export type StorageAdapter = {
  provider: "local" | "netlify-blobs";
  uploadAsset(args: UploadAssetArgs): Promise<string>;
  getAsset(key: string): Promise<StoredAsset | null>;
};
