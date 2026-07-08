import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

export async function login(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword || password !== correctPassword) return false;

  const token = "starry_" + btoa(password);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return true;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const expected = "starry_" + btoa(correctPassword);
  return token === expected;
}
