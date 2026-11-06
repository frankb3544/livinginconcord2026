import { db } from "./db";
import type { BlogCategory } from "./schema";

/**
 * Fetch all neighborhoods ordered by rating descending.
 * This is a backend-only function.
 */
export async function getNeighborhoodsListServer() {
  return await db
    .selectFrom("neighborhoods")
    .selectAll()
    .orderBy("rating", "desc")
    .execute();
}

/**
 * Fetch all testimonials ordered by createdAt descending.
 * This is a backend-only function.
 */
export async function getTestimonialsListServer() {
  return await db
    .selectFrom("testimonials")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();
}

/**
 * Fetch blog posts, optionally filtered by category, ordered by publishedAt descending.
 * This is a backend-only function.
 */
export async function getBlogListServer(category?: string) {
  let query = db.selectFrom("blogPosts").selectAll();
  
  if (category) {
    query = query.where("category", "=", category as BlogCategory);
  }

  return await query.orderBy("publishedAt", "desc").execute();
}

/**
 * Fetch a single blog post by its slug.
 * This is a backend-only function.
 */
export async function getBlogDetailServer(slug: string) {
  return await db
    .selectFrom("blogPosts")
    .where("slug", "=", slug)
    .selectAll()
    .executeTakeFirst();
}

/**
 * Fetch market reports ordered by year and month descending.
 * This is a backend-only function.
 */
export async function getMarketReportsListServer() {
  return await db
    .selectFrom("marketData")
    .selectAll()
    .orderBy("year", "desc")
    .orderBy("month", "desc")
    .execute();
}

/**
 * Fetch a single neighborhood by its slug.
 * This is a backend-only function.
 */
export async function getNeighborhoodDetailServer(slug: string) {
  return await db
    .selectFrom("neighborhoods")
    .where("slug", "=", slug)
    .selectAll()
    .executeTakeFirst();
}

/**
 * Fetch social media links from site settings.
 * This is a backend-only function.
 */
export async function getSocialLinksServer() {
  const settings = await db
    .selectFrom("siteSettings")
    .where("settingKey", "in", ["social_instagram", "social_facebook", "social_tiktok"])
    .select(["settingKey", "settingValue"])
    .execute();

  const links = {
    instagram: "",
    facebook: "",
    tiktok: "",
  };

  for (const setting of settings) {
    if (setting.settingKey === "social_instagram") {
      links.instagram = setting.settingValue || "";
    } else if (setting.settingKey === "social_facebook") {
      links.facebook = setting.settingValue || "";
    } else if (setting.settingKey === "social_tiktok") {
      links.tiktok = setting.settingValue || "";
    }
  }

  return links;
}