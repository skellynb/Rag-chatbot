import { UIMessage, streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";



const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});
export async function POST(req: Request) {
  try{
  const {messages}: {messages: UIMessage[]} = await req.json();
  const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: convertToModelMessages(messages),   

    });

    return result.toUIMessageStreamResponse();

}catch (error) {
  console.error("Error streaming chat completion:", error);
  return new Response("Failed to stream chat completion", {status: 500});

}
}