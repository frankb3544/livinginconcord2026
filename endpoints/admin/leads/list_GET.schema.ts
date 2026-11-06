import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { 
  ContactSubmissions, 
  GuideDownloads, 
  HomeValuationRequests, 
  MarketUpdateSignups 
} from "../../../helpers/schema";

export const schema = z.object({});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  contacts: Selectable<ContactSubmissions>[];
  guideDownloads: Selectable<GuideDownloads>[];
  valuationRequests: Selectable<HomeValuationRequests>[];
  marketUpdateSignups: Selectable<MarketUpdateSignups>[];
};

export const getLeadsList = async (
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/leads/list`, {
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