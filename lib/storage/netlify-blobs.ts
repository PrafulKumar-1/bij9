import { getStore } from "@netlify/blobs";

import type { StorageAdapter, UploadAssetArgs } from "@/lib/storage/adapter";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function sanitizeFolder(folder?: string) {
  const normalized = (folder || "general").toLowerCase().replace(/[^a-z0-9/-]/g, "");
  const collapsed = normalized
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .join("/");

  return collapsed || "general";
}

function getStoreName() {
  return process.env.NETLIFY_BLOBS_STORE || "globalmerch-uploads";
}

export class NetlifyBlobsStorageAdapter implements StorageAdapter {
  provider = "netlify-blobs" as const;

  async uploadAsset({ file, folder = "general" }: UploadAssetArgs): Promise<string> {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error("Unsupported file type.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File too large.");
    }

    const safeFolder = sanitizeFolder(folder);
    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const key = `${safeFolder}/${filename}`;

    const store = getStore(getStoreName());
    const arrayBuffer = await file.arrayBuffer();

    await store.set(key, arrayBuffer, {
      metadata: {
        contentType: file.type,
        originalName: file.name,
      },
    });

    const encodedPath = key
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");

    return `/api/media/${encodedPath}`;
  }

  async getAsset(key: string) {
    const normalizedKey = key
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean)
      .join("/");

    const store = getStore(getStoreName());
    const blob = await store.getWithMetadata(normalizedKey, { type: "arrayBuffer" });

    if (!blob) {
      return null;
    }

    const metadata = blob.metadata as Record<string, unknown>;
    const contentType =
      typeof metadata.contentType === "string" && metadata.contentType
        ? metadata.contentType
        : "application/octet-stream";

    return {
      data: blob.data,
      contentType,
      etag: blob.etag,
    };
  }
}
