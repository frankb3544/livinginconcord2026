import { schema, OutputType } from "./create_POST.schema";
import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    if (user.role !== "admin") {
      return new Response(superjson.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const json = superjson.parse(await request.text());
    const input = schema.parse(json);

    const marketData = await db
      .insertInto("marketData")
      .values({
        month: input.month,
        year: input.year,
        medianPrice: input.medianPrice,
        homesSold: input.homesSold,
        avgDaysOnMarket: input.avgDaysOnMarket,
        activeListings: input.activeListings,
        priceChangeYoy: input.priceChangeYoy,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Response(superjson.stringify(marketData satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}