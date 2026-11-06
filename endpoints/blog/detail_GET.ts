import { schema, OutputType } from "./detail_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const result = schema.parse({
      slug: url.searchParams.get("slug") || undefined
    });

    const post = await db
      .selectFrom("blogPosts")
      .where("slug", "=", result.slug)
      .selectAll()
      .executeTakeFirst();

    if (!post) {
      return new Response(superjson.stringify({ error: "Blog post not found" }), {
        status: 404,
      });
    }

    return new Response(superjson.stringify(post satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}