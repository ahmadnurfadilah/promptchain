import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req) {
  const { prompt, inputValues } = await req.json();

  console.log(prompt);
  console.log(inputValues);

  const template = prompt?.prompt;

  const promptText = template.replace(/\[(.*?)\]/g, (match, placeholder) => {
    const dynamicValue = inputValues[placeholder];
    return dynamicValue || match;
  });

  console.log(promptText);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: prompt?.model || "text-davinci-003",
    stream: true,
    temperature: parseFloat(prompt?.temperature || 0.6),
    max_tokens: parseInt(prompt?.max_tokens || 1024),
    prompt: promptText,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
