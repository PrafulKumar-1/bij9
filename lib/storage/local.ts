import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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

function inferContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") {
    return "image/jpeg";
  }
  if (ext === ".png") {
    return "image/png";
  }
  if (ext === ".webp") {
    return "image/webp";
  }
  if (ext === ".pdf") {
    return "application/pdf";
  }
  return "application/octet-stream";
}

export class LocalStorageAdapter implements StorageAdapter {
  provider = "local" as const;

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
    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    const targetPath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(targetPath, buffer);

    return `/uploads/${safeFolder}/${filename}`;
  }

  async getAsset(key: string) {
    const safeKey = key
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean)
      .join("/");
    const uploadRoot = path.join(process.cwd(), "public", "uploads");
    const fullPath = path.join(uploadRoot, safeKey);

    if (!fullPath.startsWith(uploadRoot)) {
      return null;
    }

    try {
      const data = await readFile(fullPath);
      return {
        data: data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
        contentType: inferContentType(fullPath),
      };
    } catch {
      return null;
    }
  }
}
