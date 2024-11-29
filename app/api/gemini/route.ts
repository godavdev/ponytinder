import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"
export const GET = async () => {
  const result = await generateText({
    model: google("gemini-1.5-flash"),
    prompt: "Quien es el donald trump?",
  })
  return NextResponse.json({ text: result.text })
}
