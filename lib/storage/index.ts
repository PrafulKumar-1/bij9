import { LocalStorageAdapter } from "@/lib/storage/local";
import { NetlifyBlobsStorageAdapter } from "@/lib/storage/netlify-blobs";
import type { StorageAdapter } from "@/lib/storage/adapter";

function getStorageProvider() {
  return process.env.STORAGE_PROVIDER === "netlify-blobs" ? "netlify-blobs" : "local";
}

export const storage: StorageAdapter =
  getStorageProvider() === "netlify-blobs" ? new NetlifyBlobsStorageAdapter() : new LocalStorageAdapter();
