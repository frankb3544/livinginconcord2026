import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Neighborhoods } from "../../../helpers/schema";

export const schema = z.object({
  id: z.number(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  highlights: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  youtubeVideoUrl: z.string().optional().nullable(),
  priceRangeMin: z.number().optional(),
  priceRangeMax: z.number().optional(),
  rating: z.union([z.number(), z.string()]).optional(),
  tags: z.array(z.string()).optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<Neighborhoods>;

export const postUpdateNeighborhood = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/neighborhoods/update`, {
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