import type { PagePrefetchFn } from "@floot/prefetch";
import {
  getNeighborhoodsListServer,
  getTestimonialsListServer,
  getBlogListServer,
  getSocialLinksServer,
} from "../helpers/serverQueries";

export const prefetch: PagePrefetchFn = async (ctx) => {
  const { qc } = ctx;
  await Promise.all([
    qc.prefetchQuery({
      queryKey: ["neighborhoods"],
      queryFn: () => getNeighborhoodsListServer(),
    }),
    qc.prefetchQuery({
      queryKey: ["testimonials"],
      queryFn: () => getTestimonialsListServer(),
    }),
    qc.prefetchQuery({
      queryKey: ["blogPosts", undefined],
      queryFn: () => getBlogListServer(undefined),
    }),
    qc.prefetchQuery({
      queryKey: ["socialLinks"],
      queryFn: () => getSocialLinksServer(),
    }),
  ]);
  return { maxAge: 300 };
};