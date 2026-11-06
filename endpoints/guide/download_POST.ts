import { schema, OutputType } from "./download_POST.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const json = superjson.parse(await request.text());
    const result = schema.parse(json);

    await db
      .insertInto("guideDownloads")
      .values({
        fullName: result.fullName,
        email: result.email,
        phone: result.phone || null,
        movingFrom: result.movingFrom || null,
      })
      .execute();

    return new Response(superjson.stringify({ success: true } satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}