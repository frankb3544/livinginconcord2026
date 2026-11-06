import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import { BlogCategoryArrayValues, type BlogPosts } from "../../../helpers/schema";

export const schema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category: z.enum(BlogCategoryArrayValues).optional(),
  imageUrl: z.string().optional().nullable(),
  author: z.string().optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<BlogPosts>;

export const postUpdateBlogPost = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/blog/update`, {
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