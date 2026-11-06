import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { MarketData } from "../../../helpers/schema";

export const schema = z.object({
  id: z.number(),
  month: z.number().min(1).max(12).optional(),
  year: z.number().optional(),
  medianPrice: z.number().optional(),
  homesSold: z.number().optional(),
  avgDaysOnMarket: z.number().optional(),
  activeListings: z.number().optional(),
  priceChangeYoy: z.union([z.number(), z.string()]).optional(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<MarketData>;

export const postUpdateMarketData = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/market-data/update`, {
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