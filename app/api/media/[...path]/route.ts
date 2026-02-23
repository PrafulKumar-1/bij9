import { NextRequest, NextResponse } from "next/server";

import { storage } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  if (!path || !path.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const key = path.map((segment) => decodeURIComponent(segment)).join("/");
  const asset = await storage.getAsset(key);

  if (!asset) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(asset.data, {
    headers: {
      "Content-Type": asset.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(asset.etag ? { ETag: asset.etag } : {}),
    },
  });
}
