import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const response = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.statusText}` },
        { status: response.status }
      )
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    if (error instanceof Error &&
        (error.message.includes("fetch failed") || error.message.includes("ECONNREFUSED"))) {
      return NextResponse.json(
        { error: "Unable to connect to backend. Ensure it's running." },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
