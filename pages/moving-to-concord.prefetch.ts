import type { PagePrefetchFn } from "@floot/prefetch";
import { getNeighborhoodsListServer } from "../helpers/serverQueries";

export const prefetch: PagePrefetchFn = async (ctx) => {
  const { qc } = ctx;
  await qc.prefetchQuery({
    queryKey: ["neighborhoods"],
    queryFn: () => getNeighborhoodsListServer(),
  });
  return { maxAge: 600 };
};