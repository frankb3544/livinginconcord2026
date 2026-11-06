import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { MarketData } from "../../../helpers/schema";

export const schema = z.object({
  month: z.number().min(1).max(12),
  year: z.number(),
  medianPrice: z.number(),
  homesSold: z.number(),
  avgDaysOnMarket: z.number(),
  activeListings: z.number(),
  priceChangeYoy: z.union([z.number(), z.string()]),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = Selectable<MarketData>;

export const postCreateMarketData = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const result = await fetch(`/_api/admin/market-data/create`, {
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