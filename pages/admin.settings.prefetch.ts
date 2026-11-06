import type { PagePrefetchFn } from "@floot/prefetch";

export const prefetch: PagePrefetchFn = async (ctx) => {
  // Call getRequest to opt out of caching for this authenticated admin route
  ctx.getRequest();
  
  return { maxAge: 0 };
};