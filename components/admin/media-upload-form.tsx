"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MediaUploadForm() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async (file: File | null) => {
    if (!file) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "admin");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { url: string };
      setUrl(data.url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="media">Upload Image/PDF</Label>
        <Input id="media" onChange={(event) => upload(event.target.files?.[0] ?? null)} type="file" />
      </div>
      <Button disabled={loading} type="button" variant="secondary">
        {loading ? "Uploading..." : "Use file selector to upload"}
      </Button>
      {url ? (
        <div className="rounded-md border border-[var(--gm-color-border)] bg-white/5 p-3 text-sm text-[var(--gm-color-text-muted)]">
          Uploaded URL: <code>{url}</code>
        </div>
      ) : null}
    </div>
  );
}
