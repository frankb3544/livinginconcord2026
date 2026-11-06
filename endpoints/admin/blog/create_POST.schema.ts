import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import { BlogCategoryArrayValues, type BlogPosts } from "../../../helpers/schema";

export const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string(),
  content: z.string(),
  category: z.enum(BlogCategoryArrayValues),
  imageUrl: z.string().optional().nullable(),
  author: z.string().optional().default("Franklin Bellamy"),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<BlogPosts>;

export const postCreateBlogPost = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/blog/create`, {
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