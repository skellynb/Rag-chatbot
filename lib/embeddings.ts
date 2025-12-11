import { embed, embedMany } from "ai";
import { createOpenAI } from "@ai-sdk/openai";


const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateEmbedding (text: string) {
  const input = text.replace("\n", " ");

  const {embedding} = await embed({
    model: groq.textEmbeddingModel("text-embedding-3-small"),
    value:input,
  });

  return embedding;
}

export async function generateEmbeddings (texts: string[]) {
  const inputs = texts.map((text) => text.replace("\n", " "));

  const {embeddings} = await embedMany({
    model: groq.textEmbeddingModel("text-embedding-3-small"),
    values:inputs,
  });
  return embeddings;
}