import { schema, OutputType } from "./list_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const marketData = await db
      .selectFrom("marketData")
      .selectAll()
      .orderBy("year", "desc")
      .orderBy("month", "desc")
      .execute();

    return new Response(superjson.stringify(marketData satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}