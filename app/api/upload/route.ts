import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/lib/storage";
import { uploadSchema } from "@/lib/validators/upload";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const parsed = uploadSchema.safeParse({
    folder: formData.get("folder")?.toString(),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid folder" }, { status: 400 });
  }

  try {
    const url = await storage.uploadAsset({
      file,
      folder: parsed.data.folder,
    });

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
