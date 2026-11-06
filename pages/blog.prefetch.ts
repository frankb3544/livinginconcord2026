import type { PagePrefetchFn } from "@floot/prefetch";
import { getBlogListServer } from "../helpers/serverQueries";

export const prefetch: PagePrefetchFn = async (ctx) => {
  const { qc } = ctx;
  await qc.prefetchQuery({
    queryKey: ["blogPosts", undefined],
    queryFn: () => getBlogListServer(undefined),
  });
  return { maxAge: 300 };
};