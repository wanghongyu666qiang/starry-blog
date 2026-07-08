import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TIMELINE_PATH = path.join(process.cwd(), "src/content/timeline.json");

export async function PUT(request: Request) {
  const events = await request.json();
  fs.writeFileSync(TIMELINE_PATH, JSON.stringify(events, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
