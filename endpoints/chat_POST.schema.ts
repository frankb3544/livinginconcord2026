import { z } from "zod";
import superjson from "superjson";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const schema = z.object({
  messages: z.array(chatMessageSchema),
});

export type InputType = z.infer<typeof schema>;

/**
 * Custom fetcher for the streaming chat endpoint.
 * Note: Returns the raw Response object to allow the client to read the stream, 
 * rather than parsing JSON.
 */
export const postChatStream = async (
  body: InputType,
  init?: RequestInit
): Promise<Response> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/chat`, {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!result.ok) {
    let errorMessage = "Chat API request failed";
    try {
      const errorObject = superjson.parse<{ error: string }>(await result.text());
      if (errorObject.error) errorMessage = errorObject.error;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return result;
};