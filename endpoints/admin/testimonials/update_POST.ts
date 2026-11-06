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
    if (input.clientName !== undefined) updateData.clientName = input.clientName;
    if (input.content !== undefined) updateData.content = input.content;
    if (input.location !== undefined) updateData.location = input.location;
    if (input.rating !== undefined) updateData.rating = input.rating;

    const testimonial = await db
      .updateTable("testimonials")
      .set(updateData)
      .where("id", "=", input.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new Response(superjson.stringify(testimonial satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}