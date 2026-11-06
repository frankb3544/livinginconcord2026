import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const postUpdateAgentSettings = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/settings/agent/update`, {
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