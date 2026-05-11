import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key is missing." }, { status: 500 });
  }
  return NextResponse.json({ apiKey });
}
