import type { PagePrefetchFn } from "@floot/prefetch";

export const prefetch: PagePrefetchFn = async (ctx) => {
  // The MarketStatsGrid component relies on static/internal data configurations
  // so there is no dynamic query to prefetch here. We just set a cache duration.
  return { maxAge: 3600 }; // Cache for 1 hour
};