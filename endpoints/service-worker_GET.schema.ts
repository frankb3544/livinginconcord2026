import { z } from "zod";

export const schema = z.object({});

export type InputType = z.infer<typeof schema>;
export type OutputType = string;

export const getServiceWorker = async (
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/service-worker`, {
    method: "GET",
    ...init,
  });
  
  if (!result.ok) {
    throw new Error(await result.text());
  }
  
  // We return the raw text rather than JSON or superjson since it's a JS file payload
  return await result.text();
};