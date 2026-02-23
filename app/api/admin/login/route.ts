import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { setAdminAuthCookie, signAdminToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validators/auth";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = adminLoginSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const user = await db.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signAdminToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ success: true });
  setAdminAuthCookie(response, token);

  return response;
}
