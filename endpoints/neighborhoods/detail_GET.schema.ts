import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Neighborhoods } from "../../helpers/schema";

export const schema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<Neighborhoods>;

export const getNeighborhoodDetail = async (input: InputType, init?: RequestInit): Promise<OutputType> => {
  const searchParams = new URLSearchParams();
  searchParams.set("slug", input.slug);
  
  const result = await fetch(`/_api/neighborhoods/detail?${searchParams.toString()}`, {
    method: "GET",
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