"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CsvImportForm() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const importCsv = async (file: File | null) => {
    if (!file) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/import-products", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { message?: string; error?: string };
      setResult(data.message || data.error || "Import completed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="csv">CSV File</Label>
        <Input id="csv" onChange={(event) => importCsv(event.target.files?.[0] ?? null)} type="file" />
      </div>
      <Button disabled={loading} type="button" variant="secondary">
        {loading ? "Importing..." : "Use file selector to import"}
      </Button>
      {result ? (
        <div className="rounded-md border border-[var(--gm-color-border)] bg-white/5 p-3 text-sm text-[var(--gm-color-text-muted)]">
          {result}
        </div>
      ) : null}
    </div>
  );
}
