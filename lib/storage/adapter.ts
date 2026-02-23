export type UploadAssetArgs = {
  file: File;
  folder?: string;
};

export type StorageAdapter = {
  uploadAsset(args: UploadAssetArgs): Promise<string>;
};
