import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  chunkIndex: z.number().int().min(0),
  chunkData: z.string().min(1),
  totalChunks: z.number().int().min(1),
  fileName: z.string().min(1),
  isFirstChunk: z.boolean(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = { success: boolean };

export const postUploadGuide = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/guide/upload`, {
    method: "POST",
    body: superjson.stringify(body),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};