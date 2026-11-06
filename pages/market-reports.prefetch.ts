import type { PagePrefetchFn } from "@floot/prefetch";
import { getMarketReportsListServer } from "../helpers/serverQueries";

export const prefetch: PagePrefetchFn = async (ctx) => {
  const { qc } = ctx;
  await qc.prefetchQuery({
    queryKey: ["marketData"],
    queryFn: () => getMarketReportsListServer(),
  });
  return { maxAge: 300 };
};