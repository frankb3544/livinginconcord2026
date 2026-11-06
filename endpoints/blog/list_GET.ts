import { schema, OutputType } from "./list_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const rawCategory = url.searchParams.get("category");
    const result = schema.parse({
      category: rawCategory || undefined
    });

    let query = db.selectFrom("blogPosts").selectAll();
    
    if (result.category) {
      query = query.where("category", "=", result.category);
    }

    const posts = await query.orderBy("publishedAt", "desc").execute();

    return new Response(superjson.stringify(posts satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}