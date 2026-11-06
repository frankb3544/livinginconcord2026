import { OutputType } from "./list_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const neighborhoods = await db
      .selectFrom("neighborhoods")
      .selectAll()
      .orderBy("rating", "desc")
      .execute();

    return new Response(
      superjson.stringify(neighborhoods satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}