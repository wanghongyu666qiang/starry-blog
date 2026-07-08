import { getTimeline } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await getTimeline();
  return NextResponse.json(events);
}
