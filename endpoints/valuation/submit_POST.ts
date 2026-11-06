import { schema, OutputType } from "./submit_POST.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const json = superjson.parse(await request.text());
    const result = schema.parse(json);

    await db
      .insertInto("homeValuationRequests")
      .values({
        fullName: result.fullName,
        email: result.email,
        propertyAddress: result.propertyAddress,
        phone: result.phone || null,
      })
      .execute();

    return new Response(
      superjson.stringify({ success: true } satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}