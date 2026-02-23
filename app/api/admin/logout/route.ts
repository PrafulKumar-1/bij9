import { NextResponse } from "next/server";

import { clearAdminAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  clearAdminAuthCookie(response);
  return response;
}
