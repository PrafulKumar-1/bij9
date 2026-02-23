import { LocalStorageAdapter } from "@/lib/storage/local";
import { NetlifyBlobsStorageAdapter } from "@/lib/storage/netlify-blobs";

function getStorageProvider() {
  return process.env.STORAGE_PROVIDER === "netlify-blobs" ? "netlify-blobs" : "local";
}

export const storage = getStorageProvider() === "netlify-blobs" ? new NetlifyBlobsStorageAdapter() : new LocalStorageAdapter();
