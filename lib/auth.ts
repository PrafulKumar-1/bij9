import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_TOKEN_COOKIE = "gm_admin_token";

export type AdminTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

function getSecret() {
  const value = process.env.AUTH_SECRET ?? process.env.ADMIN_PASSWORD ?? "fallback-dev-secret-value";
  return new TextEncoder().encode(value);
}

export async function signAdminToken(payload: AdminTokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    const verified = await jwtVerify(token, getSecret());
    return verified.payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

export function setAdminAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export function clearAdminAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_TOKEN_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return await verifyAdminToken(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function verifyAdminRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return await verifyAdminToken(token);
}
