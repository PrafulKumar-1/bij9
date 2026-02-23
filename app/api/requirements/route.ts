import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { sendMail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { serializeStringArray } from "@/lib/utils";
import { requirementRequestSchema } from "@/lib/validators/request";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const throttle = rateLimit(`requirement:${ip}`, 6, 60_000);

  if (!throttle.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = requirementRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
  }

  const requirement = await db.requirementRequest.create({
    data: {
      ...parsed.data,
      attachments: serializeStringArray(parsed.data.attachments),
    },
  });

  await sendMail({
    to: env.ADMIN_EMAIL,
    subject: `[Requirement] ${parsed.data.productName} (${parsed.data.targetCountry})`,
    html: `
      <h2>New Requirement</h2>
      <p><strong>Product:</strong> ${parsed.data.productName}</p>
      <p><strong>Quantity:</strong> ${parsed.data.quantity} ${parsed.data.unit}</p>
      <p><strong>Country:</strong> ${parsed.data.targetCountry}</p>
      <p><strong>Incoterms:</strong> ${parsed.data.incoterms}</p>
      <p><strong>Timeline:</strong> ${parsed.data.timeline}</p>
      <p><strong>Buyer:</strong> ${parsed.data.name} (${parsed.data.email})</p>
      <p><strong>ID:</strong> ${requirement.id}</p>
    `,
  });

  return NextResponse.json({ success: true, id: requirement.id });
}
