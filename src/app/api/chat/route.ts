import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    // Use the backend runtime variable instead of a NEXT_PUBLIC_ one to prevent Next.js from inlining 'undefined' at build time
    const apiUrl = process.env.AI_PROXY_TARGET;
    const response = await fetch(`${apiUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, history })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Python API Error:", errText);
      return NextResponse.json({ error: "Failed to communicate with AI Server." }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API proxy error:", error);
    return NextResponse.json({ error: "Failed to generate response via proxy." }, { status: 500 });
  }
}
