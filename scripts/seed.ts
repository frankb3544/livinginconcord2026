/**
 * Seed the database with the content captured from the live Floot site
 * (seed-data/*.json).
 *
 *   DATABASE_URL=postgres://… npm run seed
 *
 * (DATABASE_URL or FLOOT_DATABASE_URL — see helpers/db.tsx.)
 *
 * Sources:
 *   seed-data/db-neighborhoods.json → neighborhoods (11 rows, ids preserved)
 *   seed-data/db-blog-posts.json    → blog_posts    (7 rows, ids preserved)
 *   seed-data/db-testimonials.json  → testimonials  (5 rows, ids preserved)
 *   seed-data/db-social-links.json  → site_settings (social_instagram /
 *                                     social_facebook / social_tiktok)
 *   seed-data/home.json embeds the same four datasets as dehydrated
 *   react-query state; it was verified to agree with the files above, so it
 *   is not read separately. It contains no agent-profile settings, so no
 *   agent_* keys are seeded — endpoints/settings/agent_GET falls back to its
 *   built-in defaults until an admin saves the profile.
 *
 * NOT seeded (no captured data exists): market_data rows, the relocation
 * guide PDF (guide_pdf_chunks + site_settings relocation_guide_* keys — an
 * admin uploads it via /_api/admin/guide/upload), and users (see
 * scripts/create-admin.ts).
 *
 * Safe to re-run: inserts use ON CONFLICT DO NOTHING on the primary key, and
 * identity sequences are reset to MAX(id) afterwards so new rows created
 * through the admin endpoints don't collide with the preserved ids.
 */
import { readFileSync } from "node:fs";
import { sql } from "kysely";
import { db } from "../helpers/db";

function readSeed<T>(name: string): T {
  const url = new URL(`../seed-data/${name}`, import.meta.url);
  return JSON.parse(readFileSync(url, "utf8")) as T;
}

interface NeighborhoodRow {
  id: number;
  name: string;
  slug: string;
  description: string;
  rating: string;
  priceRangeMin: number;
  priceRangeMax: number;
  tags: string[];
  imageUrl: string | null;
  highlights: string | null;
  createdAt: string;
  youtubeVideoUrl: string | null;
}

interface BlogPostRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  author: string;
  publishedAt: string;
  createdAt: string;
}

interface TestimonialRow {
  id: number;
  clientName: string;
  location: string;
  content: string;
  rating: number;
  createdAt: string;
}

async function main() {
  const neighborhoods = readSeed<NeighborhoodRow[]>("db-neighborhoods.json");
  for (const n of neighborhoods) {
    await db
      .insertInto("neighborhoods")
      .values({
        id: n.id,
        name: n.name,
        slug: n.slug,
        description: n.description,
        rating: n.rating,
        priceRangeMin: n.priceRangeMin,
        priceRangeMax: n.priceRangeMax,
        tags: n.tags,
        imageUrl: n.imageUrl,
        highlights: n.highlights,
        youtubeVideoUrl: n.youtubeVideoUrl,
        createdAt: new Date(n.createdAt),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }
  console.log(`neighborhoods: ${neighborhoods.length} rows`);

  const posts = readSeed<BlogPostRow[]>("db-blog-posts.json");
  for (const p of posts) {
    await db
      .insertInto("blogPosts")
      .values({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category as BlogPostRow["category"] as never,
        imageUrl: p.imageUrl,
        author: p.author,
        publishedAt: new Date(p.publishedAt),
        createdAt: new Date(p.createdAt),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }
  console.log(`blog_posts: ${posts.length} rows`);

  const testimonials = readSeed<TestimonialRow[]>("db-testimonials.json");
  for (const t of testimonials) {
    await db
      .insertInto("testimonials")
      .values({
        id: t.id,
        clientName: t.clientName,
        location: t.location,
        content: t.content,
        rating: t.rating,
        createdAt: new Date(t.createdAt),
      })
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();
  }
  console.log(`testimonials: ${testimonials.length} rows`);

  const social = readSeed<Record<string, string>>("db-social-links.json");
  const socialKeys: Record<string, string> = {
    instagram: "social_instagram",
    facebook: "social_facebook",
    tiktok: "social_tiktok",
  };
  for (const [field, key] of Object.entries(socialKeys)) {
    if (!(field in social)) continue;
    await db
      .insertInto("siteSettings")
      .values({ settingKey: key, settingValue: social[field] })
      .onConflict((oc) =>
        oc.column("settingKey").doUpdateSet({ settingValue: social[field] })
      )
      .execute();
  }
  console.log(`site_settings: ${Object.keys(socialKeys).length} social keys`);

  // Identity columns accepted the preserved ids above; move each sequence
  // past MAX(id) so future inserts (admin UI, registrations) don't collide.
  for (const seq of [
    "blog_posts_id_seq",
    "neighborhoods_id_seq",
    "testimonials_id_seq",
    "site_settings_id_seq",
  ]) {
    const table = seq.replace(/_id_seq$/, "");
    await sql`SELECT setval(${seq}, COALESCE((SELECT MAX(id) FROM ${sql.id(
      table
    )}), 1))`.execute(db);
  }
  console.log("identity sequences reset");
}

main()
  .then(async () => {
    await db.destroy();
    console.log("Seed complete.");
  })
  .catch(async (err) => {
    console.error("Seed failed:", err);
    await db.destroy();
    process.exit(1);
  });
