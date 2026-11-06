import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { Testimonials } from "../../../helpers/schema";

export const schema = z.object({
  id: z.number(),
  clientName: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<Testimonials>;

export const postUpdateTestimonial = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/testimonials/update`, {
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