import { db } from "../helpers/db";

const DOMAIN = "https://livinginconcordnc.com";

// Fixed date for rarely-changing static pages
const STATIC_FIXED_DATE = "2026-07-01";

export async function handle(request: Request) {
  try {
    const [blogPosts, neighborhoods, latestBlogPost] =
      await Promise.all([
        db
          .selectFrom("blogPosts")
          .select(["slug", "publishedAt"])
          .execute(),
        db
          .selectFrom("neighborhoods")
          .select(["slug", "createdAt"])
          .execute(),
        db
          .selectFrom("blogPosts")
          .select("publishedAt")
          .orderBy("publishedAt", "desc")
          .limit(1)
          .executeTakeFirst(),
      ]);

    const today = new Date().toISOString().split("T")[0];
    const latestBlogDate = latestBlogPost
      ? new Date(latestBlogPost.publishedAt).toISOString().split("T")[0]
      : today;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const staticPages = [
      { path: "", priority: "1.0", changefreq: "daily", lastmod: today },
      {
        path: "about",
        priority: "0.8",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "neighborhoods",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: today,
      },
      {
        path: "market-reports",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: today,
      },
      {
        path: "moving-to-concord",
        priority: "0.8",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/cabarrus-county",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/schools-guide",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/harrisburg",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/kannapolis",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/cost-of-living-concord-nc",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/is-concord-nc-safe",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/cox-mill-high-school",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/moving-from-new-york-to-concord-nc",
        priority: "0.8",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "moving-to-concord/apartment-living",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/buyers-faqs",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/commuting",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/concord-homes",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/growing-families",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/home-financing",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/multigenerational",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/pros-and-cons",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "moving-to-concord/senior-communities",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "market-reports/local-trends",
        priority: "0.8",
        changefreq: "weekly",
        lastmod: today,
      },
      {
        path: "neighborhoods/28027-concord-nc",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: today,
      },
      {
        path: "resources-concord",
        priority: "0.6",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "privacy-policy",
        priority: "0.3",
        changefreq: "yearly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "terms-of-service",
        priority: "0.3",
        changefreq: "yearly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "blog",
        priority: "0.9",
        changefreq: "weekly",
        lastmod: latestBlogDate,
      },
      {
        path: "contact",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "home-search",
        priority: "0.9",
        changefreq: "daily",
        lastmod: today,
      },
      {
        path: "cash-offers",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "seller-resources",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "relocation-help",
        priority: "0.7",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "things-to-do",
        priority: "0.6",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
      {
        path: "downtown-concord",
        priority: "0.6",
        changefreq: "monthly",
        lastmod: STATIC_FIXED_DATE,
      },
    ];

    for (const page of staticPages) {
      const loc = page.path ? `${DOMAIN}/${page.path}` : DOMAIN;
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const neighborhood of neighborhoods) {
      const lastmod = new Date(neighborhood.createdAt).toISOString().split("T")[0];
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/neighborhoods/${neighborhood.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const post of blogPosts) {
      const lastmod = new Date(post.publishedAt).toISOString().split("T")[0];
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Sitemap generation error:", errorMessage);
    return new Response(`Error generating sitemap: ${errorMessage}`, {
      status: 500,
    });
  }
}