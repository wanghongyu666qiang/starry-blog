import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  const ok = await login(password);
  if (!ok) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
