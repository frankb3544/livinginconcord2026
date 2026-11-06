import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { BlogPosts } from "../../helpers/schema";
import { BlogCategoryArrayValues } from "../../helpers/schema";

export const schema = z.object({
  category: z.enum(BlogCategoryArrayValues).optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<BlogPosts>[];

export const getBlogList = async (input: InputType, init?: RequestInit): Promise<OutputType> => {
  const searchParams = new URLSearchParams();
  if (input.category) {
    searchParams.set("category", input.category);
  }
  const qs = searchParams.toString() ? `?${searchParams.toString()}` : "";
  
  const result = await fetch(`/_api/blog/list${qs}`, {
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