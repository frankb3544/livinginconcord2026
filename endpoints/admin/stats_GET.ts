import { schema, OutputType } from "./stats_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";
import { getServerUserSession } from "../../helpers/getServerUserSession";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    if (user.role !== "admin") {
      return new Response(superjson.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const [
      blogPostsCount,
      neighborhoodsCount,
      testimonialsCount,
      marketDataCount,
      contactsCount,
      guideDownloadsCount,
      valuationRequestsCount,
      marketUpdateSignupsCount,
      guideSetting,
      variantACount,
      variantBCount,
    ] = await Promise.all([
      db.selectFrom("blogPosts").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("neighborhoods").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("testimonials").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("marketData").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("contactSubmissions").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("guideDownloads").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("homeValuationRequests").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("marketUpdateSignups").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("siteSettings").where("settingKey", "=", "relocation_guide_pdf").select("settingValue").executeTakeFirst(),
      db.selectFrom("contactSubmissions").where("qualifierVariant", "=", "A").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
      db.selectFrom("contactSubmissions").where("qualifierVariant", "=", "B").select(({ fn }) => fn.count("id").as("count")).executeTakeFirst(),
    ]);

    return new Response(
      superjson.stringify({
        totalBlogPosts: Number(blogPostsCount?.count || 0),
        totalNeighborhoods: Number(neighborhoodsCount?.count || 0),
        totalTestimonials: Number(testimonialsCount?.count || 0),
        totalMarketDataEntries: Number(marketDataCount?.count || 0),
        totalContacts: Number(contactsCount?.count || 0),
        totalGuideDownloads: Number(guideDownloadsCount?.count || 0),
        totalValuationRequests: Number(valuationRequestsCount?.count || 0),
        totalMarketUpdateSignups: Number(marketUpdateSignupsCount?.count || 0),
        hasRelocationGuide: !!guideSetting?.settingValue,
        variantALeads: Number(variantACount?.count || 0),
        variantBLeads: Number(variantBCount?.count || 0),
      } satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}