import { z } from "zod";

// No input needed for sitemap
export const schema = z.object({});

export type InputType = z.infer<typeof schema>;

// Returns a string of XML
export type OutputType = string;

export const getSitemap = async (
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/sitemap`, {
    method: "GET",
    ...init,
    headers: {
      ...init?.headers,
    },
  });
  
  if (!result.ok) {
    const text = await result.text();
    throw new Error(text || "Failed to fetch sitemap");
  }
  
  return await result.text();
};