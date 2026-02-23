import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { StorageAdapter, UploadAssetArgs } from "@/lib/storage/adapter";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export class LocalStorageAdapter implements StorageAdapter {
  async uploadAsset({ file, folder = "general" }: UploadAssetArgs): Promise<string> {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error("Unsupported file type.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File too large.");
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const filename = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    const targetPath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(targetPath, buffer);

    return `/uploads/${folder}/${filename}`;
  }
}
