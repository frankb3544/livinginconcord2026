/**
 * Seed the LIC-1 (EasySite) content ported into the blog system
 * (PORT-MAP §1 + §3 neighborhood extras).
 *
 *   DATABASE_URL=<postgres connection string> npm run seed:lic1
 *
 * Sources:
 *   seed-data/lic1-guides.json              → blog_posts (20 Expert Insights
 *                                             guides, ids 101–120; the
 *                                             property-taxes entry is an
 *                                             original article — LIC-1's page
 *                                             was a duplicate of its
 *                                             school-districts guide)
 *   seed-data/lic1-neighborhood-guides.json → blog_posts (4 neighborhood
 *                                             articles, ids 121–124)
 *
 * Conversion applied Frank's fact rules: 704-904-5142 only, Franklin Bellamy
 * byline only (LIC-1's "Sarah Thompson" bylines/bios removed), no "dream
 * home", LIC-1 bundle stats (medians, school ratings, enrollment figures)
 * removed or replaced with LIC-2's Canopy MLS May 2026 figures, and a
 * topic-specific disclaimer appended to every post. The LIC-1
 * nearby-cities comparison was NOT ported: it is built almost entirely
 * from bundle data tables PORT-MAP §6 excludes.
 *
 * Safe to re-run: ON CONFLICT DO NOTHING on id; run after scripts/seed.ts.
 * The blog_posts identity sequence is reset to MAX(id) afterwards.
 */
import { readFileSync } from "node:fs";
import { sql } from "kysely";
import { db } from "../helpers/db";

function readSeed<T>(name: string): T {
  const url = new URL(`../seed-data/${name}`, import.meta.url);
  return JSON.parse(readFileSync(url, "utf8")) as T;
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

async function insertPosts(file: string) {
  const posts = readSeed<BlogPostRow[]>(file);
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
  console.log(`${file}: ${posts.length} rows`);
  return posts.length;
}

async function main() {
  let total = 0;
  total += await insertPosts("lic1-guides.json");
  total += await insertPosts("lic1-neighborhood-guides.json");

  await sql`SELECT setval(${"blog_posts_id_seq"}, COALESCE((SELECT MAX(id) FROM ${sql.id(
    "blog_posts"
  )}), 1))`.execute(db);
  console.log(`identity sequence reset; ${total} LIC-1 posts seeded`);
}

main()
  .then(async () => {
    await db.destroy();
    console.log("LIC-1 seed complete.");
  })
  .catch(async (err) => {
    console.error("LIC-1 seed failed:", err);
    await db.destroy();
    process.exit(1);
  });
