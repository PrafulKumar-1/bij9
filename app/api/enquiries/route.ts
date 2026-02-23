import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { sendMail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/validators/enquiry";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const throttle = rateLimit(`enquiry:${ip}`, 8, 60_000);

  if (!throttle.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = enquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
  }

  const enquiry = await db.enquiry.create({
    data: {
      ...parsed.data,
      productId: parsed.data.productId || null,
    },
  });

  await sendMail({
    to: env.ADMIN_EMAIL,
    subject: `[Enquiry] ${parsed.data.type === "product" ? "Product" : "General"} enquiry from ${parsed.data.name}`,
    html: `
      <h2>New Enquiry</h2>
      <p><strong>Name:</strong> ${parsed.data.name}</p>
      <p><strong>Email:</strong> ${parsed.data.email}</p>
      <p><strong>Company:</strong> ${parsed.data.company ?? "-"}</p>
      <p><strong>Country:</strong> ${parsed.data.country ?? "-"}</p>
      <p><strong>Message:</strong> ${parsed.data.message}</p>
      <p><strong>ID:</strong> ${enquiry.id}</p>
    `,
  });

  return NextResponse.json({ success: true, id: enquiry.id });
}
