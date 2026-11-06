import { schema, OutputType } from "./list_GET.schema";
import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    if (user.role !== "admin") {
      return new Response(superjson.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const [contacts, guideDownloads, valuationRequests, marketUpdateSignups] = await Promise.all([
      db.selectFrom("contactSubmissions").selectAll().orderBy("createdAt", "desc").execute(),
      db.selectFrom("guideDownloads").selectAll().orderBy("createdAt", "desc").execute(),
      db.selectFrom("homeValuationRequests").selectAll().orderBy("createdAt", "desc").execute(),
      db.selectFrom("marketUpdateSignups").selectAll().orderBy("createdAt", "desc").execute(),
    ]);

    return new Response(
      superjson.stringify({
        contacts,
        guideDownloads,
        valuationRequests,
        marketUpdateSignups,
      } satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}