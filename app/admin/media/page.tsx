import { readdir } from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";

import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminMediaPage() {
  const files = await listUploadedFiles();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUploadForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-[var(--gm-color-text-muted)]">
            {files.length ? files.map((file) => <div key={file}>{file}</div>) : <p>No uploads yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function listUploadedFiles() {
  if (process.env.STORAGE_PROVIDER === "netlify-blobs") {
    try {
      const store = getStore(process.env.NETLIFY_BLOBS_STORE || "globalmerch-uploads");
      const listed = await store.list();
      return listed.blobs.slice(0, 100).map((blob) => `/api/media/${blob.key}`).sort((a, b) => b.localeCompare(a));
    } catch {
      return [];
    }
  }

  try {
    const root = path.join(process.cwd(), "public", "uploads");
    const folders = await readdir(root, { withFileTypes: true });
    const result: string[] = [];

    for (const folder of folders) {
      if (folder.isDirectory()) {
        const nested = await readdir(path.join(root, folder.name));
        for (const name of nested) {
          result.push(`/uploads/${folder.name}/${name}`);
        }
      }
    }

    return result.slice(0, 100).sort((a, b) => b.localeCompare(a));
  } catch {
    return [];
  }
}
