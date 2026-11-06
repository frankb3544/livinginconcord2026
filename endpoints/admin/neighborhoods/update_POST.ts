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
    if (input.name !== undefined) updateData.name = input.name;
    if (input.slug !== undefined) updateData.slug = input.slug;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.highlights !== undefined) updateData.highlights = input.highlights;
    if (input.imageUrl !== undefined) updateData.imageUrl = input.imageUrl;
    if (input.priceRangeMin !== undefined) updateData.priceRangeMin = input.priceRangeMin;
    if (input.priceRangeMax !== undefined) updateData.priceRangeMax = input.priceRangeMax;
    if (input.rating !== undefined) updateData.rating = input.rating;
    if (input.tags !== undefined) updateData.tags = input.tags;
    if (input.youtubeVideoUrl !== undefined) updateData.youtubeVideoUrl = input.youtubeVideoUrl;

    const neighborhood = await db
      .updateTable("neighborhoods")
      .set(updateData)
      .where("id", "=", input.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Response(superjson.stringify(neighborhood satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}