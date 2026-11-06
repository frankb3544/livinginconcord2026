import { schema, OutputType } from "./update_POST.schema";
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

    const updateData: any = {};
    if (input.month !== undefined) updateData.month = input.month;
    if (input.year !== undefined) updateData.year = input.year;
    if (input.medianPrice !== undefined) updateData.medianPrice = input.medianPrice;
    if (input.homesSold !== undefined) updateData.homesSold = input.homesSold;
    if (input.avgDaysOnMarket !== undefined) updateData.avgDaysOnMarket = input.avgDaysOnMarket;
    if (input.activeListings !== undefined) updateData.activeListings = input.activeListings;
    if (input.priceChangeYoy !== undefined) updateData.priceChangeYoy = input.priceChangeYoy;

    const marketData = await db
      .updateTable("marketData")
      .set(updateData)
      .where("id", "=", input.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Response(superjson.stringify(marketData satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}