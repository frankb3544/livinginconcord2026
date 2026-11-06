import type { PagePrefetchFn } from "@floot/prefetch";
import {
  getBlogDetailServer,
  getNeighborhoodsListServer,
  getBlogListServer,
} from "../helpers/serverQueries";

export const prefetch: PagePrefetchFn = async (ctx) => {
  const { qc, url } = ctx;
  const pathname = new URL(url).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[segments.length - 1];

  if (slug) {
    await Promise.all([
      qc.prefetchQuery({
        queryKey: ["blogPost", slug],
        queryFn: () => getBlogDetailServer(slug),
      }),
      qc.prefetchQuery({
        queryKey: ["neighborhoods"],
        queryFn: () => getNeighborhoodsListServer(),
      }),
      qc.prefetchQuery({
        queryKey: ["blogPosts", undefined],
        queryFn: () => getBlogListServer(),
      }),
    ]);
  }

  return { maxAge: 300 };
};