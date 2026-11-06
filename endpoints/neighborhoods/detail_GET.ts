import { schema, OutputType } from "./detail_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const result = schema.parse({
      slug: url.searchParams.get("slug") || undefined
    });

    const neighborhood = await db
      .selectFrom("neighborhoods")
      .where("slug", "=", result.slug)
      .selectAll()
      .executeTakeFirst();

    if (!neighborhood) {
      return new Response(superjson.stringify({ error: "Neighborhood not found" }), {
        status: 404,
      });
    }

    return new Response(superjson.stringify(neighborhood satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}