import type { PagePrefetchFn } from "@floot/prefetch";

export const prefetch: PagePrefetchFn = async () => {
  // Static gated page, no dynamic queries needed for SSR.
  // We can return a short maxAge or nothing.
  return;
};