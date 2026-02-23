import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") ?? "GlobalMerch Export";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #111111 0%, #1b1b1b 70%, #272011 100%)",
          color: "#f5f5f5",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: "0.3em", color: "#c6a45d", textTransform: "uppercase" }}>
          GlobalMerch Export
        </div>
        <div style={{ marginTop: 28, fontSize: 64, textAlign: "center", maxWidth: "900px", lineHeight: 1.12 }}>{title}</div>
        <div style={{ marginTop: 24, fontSize: 26, color: "#c7c7c7" }}>Merchant Exporter from India → Worldwide</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
