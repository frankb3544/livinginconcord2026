import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  totalBlogPosts: number;
  totalNeighborhoods: number;
  totalTestimonials: number;
  totalMarketDataEntries: number;
  totalContacts: number;
  totalGuideDownloads: number;
  totalValuationRequests: number;
  totalMarketUpdateSignups: number;
  hasRelocationGuide: boolean;
  variantALeads: number;
  variantBLeads: number;
};

export const getAdminStats = async (
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/stats`, {
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