import { NextRequest, NextResponse } from "next/server";

import { verifyAdminRequest } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { storage } from "@/lib/storage";
import { uploadSchema } from "@/lib/validators/upload";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const throttle = rateLimit(`upload:${ip}`, 10, 60_000);

  if (!throttle.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

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

  const folder = parsed.data.folder ?? "general";
  if (folder.startsWith("admin")) {
    const session = await verifyAdminRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const url = await storage.uploadAsset({
      file,
      folder,
    });

    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
